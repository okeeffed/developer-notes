import * as AWS from "aws-sdk";
import * as fs from "fs-extra";
import recursive from "recursive-readdir";

const mime = require("mime-types");
const cwd = process.cwd();
AWS.config.update({ region: process.env.AWS_REGION });

/**
 * Set localhost for local dev
 */
const params: AWS.DynamoDB.ClientConfiguration =
  process.env.NODE_ENV === "development"
    ? {
        endpoint: "http://localhost:4566",
        s3ForcePathStyle: true,
      }
    : {};

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  ...params,
});

/**
 * Fetch an individual object from an S3 bucket
 *
 * @param {*} { data, s3bucket, params, outputPath }
 * @returns
 */
// @ts-ignore
const getAndWriteObject = ({ data, s3bucket, params, outputPath }) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Fetching:", data.Key);
      const modulePath = data.Key.split(outputPath + "/").join("");
      const objParams = {
        Bucket: params.Bucket,
        Key: data.Key,
      };
      const obj = await s3bucket.getObject(objParams).promise();
      fs.outputFileSync(outputPath + "/" + modulePath, obj.Body);
      console.log("Installed", data.Key);
      resolve(null);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Get assets from a particular S3 bucket
 *
 * @param {*} params The required params for an AWS.S3.listObjectsV2 call
 * @param {*} [outputPath=cwd] Where to write the file to
 */
export const getAssets = async (
  params: AWS.S3.ListObjectsV2Request,
  outputPath = cwd
) => {
  try {
    // 1. Check if module exists
    console.log("Fetching assets from S3...");

    /*
        ! Consider adding check for package.json?
        if (!fs.pathExistsSync(dest)) {
            throw new Error('Module path does not exist', dest);
        }
        */
    const data = await s3.listObjectsV2(params).promise();

    const res = data.Contents.map((data) =>
      getAndWriteObject({ data, params, outputPath, s3bucket: s3 })
    );

    await Promise.all(res);
  } catch (err) {
    console.log(err);
  }
};

/**
 * An object that can be used to make a project public
 *
 * @param {*} site
 */
export const s3PublicSitePolicy = (site: string) => ({
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicReadGetObject",
      Effect: "Allow",
      Principal: {
        AWS: "*",
      },
      Action: "s3:GetObject",
      Resource: `arn:aws:s3:::${site}/*"`,
    },
  ],
});

/**
 * Fetch the bucket policy
 *
 * @param {*} bucket
 * @returns
 */
export const getBucketPolicy = async (bucket: string) => {
  try {
    const params = {
      Bucket: bucket,
    };
    const res = await s3.getBucketPolicy(params).promise();

    return res;
  } catch (err) {
    console.error(err);
    return;
  }
};

/**
 * Create S3 bucket
 *
 * @param {*} {bucket, location = 'ap-southeast-2'}
 * @returns
 */
export const createBucket = async ({
  bucket,
  location = "ap-southeast-2",
}: {
  bucket: string;
  location?: string;
}) => {
  try {
    const params = {
      Bucket: bucket,
      CreateBucketConfiguration: {
        LocationConstraint: location,
      },
    };
    const res = await s3.createBucket(params).promise();
    return res;
  } catch (err) {
    console.error(err);
    return;
  }
};

// S3 Helper functions
export const listS3BucketObjects = (params: AWS.S3.ListObjectsV2Request) => {
  return s3.listObjectsV2(params).promise();
};

// S3 Helper functions
// @ts-ignore
export const listS3BucketObjectsDelimited = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const { CommonPrefixes } = await s3.listObjectsV2(params).promise();
      // string[]
      const res = CommonPrefixes.map((item) => item.Prefix);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });

/**
 * Fetch S3 object from remote
 *
 * @param {*} params S3 getObject params
 */
export const getObject = (params: AWS.S3.GetObjectRequest) =>
  s3.getObject(params).promise();

/**
 * Put an object to an S3 bucket
 *
 * @param params S3 putObject params
 * @example
 * {
  Body: <Binary String>, 
  Bucket: "examplebucket", 
  Key: "exampleobject", 
  ServerSideEncryption: "AES256", 
  Tagging: "key1=value1&key2=value2"
 }
 */
export const putObject = (params: AWS.S3.PutObjectRequest) =>
  s3.putObject(params).promise();

/**
 * Default function for defining the S3 key
 *
 * @param {*} file
 * @returns
 */
const defaultKeyFn = (file: string) => {
  const relativeFilePath = file.replace(process.cwd() + "/", "");

  return relativeFilePath;
};

/**
 * Put all object from a source `dir`
 * into a remote bucket.
 *
 * The `keyFn` is used to generate the path
 * in the S3 bucket from the root.
 *
 * @param {*} { bucket, dir, keyFn }
 */
export const putAllObjectsToBucket = ({
  bucket,
  dir,
  keyFn = defaultKeyFn,
}: {
  bucket: string;
  dir: string;
  keyFn?: (file: string) => string;
}) =>
  new Promise(async (resolve, reject) => {
    recursive(dir, function (err, files) {
      if (err) {
        reject(err);
      }

      files.map(async (file) => {
        try {
          const key = keyFn(file);
          //configuring parameters
          const params = {
            Body: fs.createReadStream(file),
            Key: key,
            Bucket: bucket,
            ContentType: mime.lookup(file),
          };

          await s3.upload(params).promise();
        } catch (err) {
          reject(err);
        }
      });

      resolve(null);
    });
  });

export const deleteBucket = ({ bucket }: { bucket: string }) =>
  new Promise((resolve, reject) => {
    const params = {
      Bucket: bucket,
    };
    s3.deleteBucket(params, function (err, data) {
      if (err) reject(err);
      // an error occurred
      else resolve(data); // successful response
    });
  });

/**
 * List all s3 buckets.
 *
 * @param params S3 bucket params
 * @example
 * // returns
  data = {
   Buckets: [
      {
     CreationDate: <Date Representation>, 
     Name: "examplebucket"
    }, 
      {
     CreationDate: <Date Representation>, 
     Name: "examplebucket2"
    }, 
      {
     CreationDate: <Date Representation>, 
     Name: "examplebucket3"
    }
   ], 
   Owner: {
    DisplayName: "own-display-name", 
    ID: "examplee7a2f25102679df27bb0ae12b3f85be6f290b936c4393484be31"
   }
  }
 */
export const listBuckets = () => s3.listBuckets().promise();
