import * as fs from "fs";
import path from "path";
import _ from "lodash";
// import recursive from "recursive-readdir";
import crypto from "crypto";

const hash = (str: string) =>
  crypto.createHash("sha256").update(str, "utf8").digest("hex");

const CONTENT_PATH = path.resolve(__dirname, "../../public/content");

const generateIndexFileName = (folderName: string) =>
  folderName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-") + ".md";

const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .filter((dirent) => !/^\.(.+)/.test(dirent.name))
    .map((dirent) => dirent.name);

const getDirectoryFilesAndFolder = (source) =>
  fs.readdirSync(source, { withFileTypes: true }).map((dirent) => dirent.name);

const generateIndexFileContent = (
  folderName: string,
  folders: string[]
) => `# ${folderName}

## Material

${folders.map((folder) => `- [[${folder.replace(".md", "")}]]`).join("\n")}
`;

const generateIndexFileForFolder = async (folder) => {
  // const files = getDirectoryFiles(folder).filter((file) => /\.md$/.test(file));
  // const filesFullPath = await recursive(folder, ["!*.md"]);
  // const files = filesFullPath.map((file) =>
  //   file.replace(`${path.resolve(folder)}/`, "")
  // );

  const files = getDirectoryFilesAndFolder(folder);

  const folderName = folder.split("/").pop();
  const indexFileName = generateIndexFileName(folderName);
  const indexFilePath = path.resolve(folder, indexFileName);

  // generate the markdown content
  const content = generateIndexFileContent(_.startCase(folderName), files);
  const doesFileAlreadyExist = fs.existsSync(indexFilePath);

  if (doesFileAlreadyExist) {
    const existingContent = fs.readFileSync(indexFilePath, "utf8");
    const oldHash = hash(existingContent);
    const newHash = hash(content);

    if (oldHash === newHash) {
      return {
        code: -2,
        fileName: indexFileName,
      };
    }
  }

  fs.writeFileSync(indexFilePath, content, "utf-8");

  if (doesFileAlreadyExist) {
    return {
      code: -1,
      fileName: indexFileName,
    };
  }

  return {
    code: 0,
    fileName: indexFileName,
  };
};

async function main({ folderPath }: { folderPath: string }) {
  const folders = getDirectories(folderPath);

  for (const folder of folders) {
    const childFolderPath = path.resolve(folderPath, folder);
    const result = await generateIndexFileForFolder(childFolderPath);

    switch (result.code) {
      case 0:
        console.log("Index file created:", result.fileName);
        break;
      case -2:
        console.log("[WARN] No changes to file", result.fileName);
        break;
      default:
        console.log("[WARN] Index file overwritten:", result.fileName);
        break;
    }

    // recurisvely check children folders
    main({ folderPath: childFolderPath });
  }
}

main({ folderPath: CONTENT_PATH });
