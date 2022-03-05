import * as fs from "fs";
import path from "path";
import _ from "lodash";
import recursive from "recursive-readdir";

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

// const getDirectoryFiles = (source) =>
//   fs
//     .readdirSync(source, { withFileTypes: true })
//     .filter((dirent) => !dirent.isDirectory())
//     .map((dirent) => dirent.name);

const generateIndexFileContent = (
  folderName: string,
  folders: string[]
) => `# ${folderName}

## Material

${folders.map((folder) => `- [[${folder.replace(".md", "")}]]`).join("\n")}
`;

const generateIndexFileForFolder = async (folder) => {
  // const files = getDirectoryFiles(folder).filter((file) => /\.md$/.test(file));
  const filesFullPath = await recursive(folder, ["!*.md"]);
  const files = filesFullPath.map((file) =>
    file.replace(path.resolve(folder), "")
  );

  const folderName = folder.split("/").pop();
  const indexFileName = generateIndexFileName(folderName);
  const indexFilePath = path.resolve(folder, indexFileName);

  if (fs.existsSync(indexFilePath)) {
    return {
      code: -1,
      fileName: indexFileName,
    };
  }

  // generate the markdown content
  const content = generateIndexFileContent(_.startCase(folderName), files);

  fs.writeFileSync(indexFilePath, content, "utf-8");
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
      default:
        console.log("Index file already exists:", result.fileName);
        break;
    }

    // recurisvely check children folders
    main({ folderPath: childFolderPath });
  }
}

main({ folderPath: CONTENT_PATH });
