---
name: S 3 Buckets
menu: AWS 
---
# AWS with S3

## Create a bucket and deploy create-react-app to bucket

```
aws s3 mb s3://[bucketname] --region ap-southeast-2
aws s3api put-bucket-policy --bucket [bucketname] --policy file://policy.json
npm run build
aws s3 sync build/ s3://[bucketname]
```
