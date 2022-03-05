import fs from "fs";
import path from "path";
import kratosJson from "../../kratos.json";

const LOCAL_LIFT_PATH = path.resolve(__dirname, "../../.lift");

const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const getDirectoryFiles = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => !dirent.isDirectory())
    .map((dirent) => dirent.name);

/**
 * Helper to generate the README for the website.
 *
 * @param pkgType
 * @param pkgModule
 * @param version
 * @param readme
 * @param lastUpdated
 * @returns
 */
const generateReadme = (
  pkgType,
  pkgModule,
  version,
  readme,
  lastUpdated = ""
) => `---
type: "${pkgType}"
title: "${pkgModule}"
lastUpdated: "${lastUpdated}"
version: "${version}"
---

${readme}`;

function writeReadmeToContent(pkgType, pkgModule, readme) {
  const outputPath = path.resolve(
    __dirname,
    "../../content/packages",
    pkgType,
    `${pkgModule}.md`
  );
  const outputFolder = path.dirname(outputPath);

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  fs.writeFileSync(outputPath, readme, "utf-8");
}

async function main() {
  const liftTemplates = Object.entries(kratosJson.dependencies.lift);

  for (const [pkgType, pkgVersion] of liftTemplates) {
    const pkgModules = getDirectories(path.resolve(LOCAL_LIFT_PATH, pkgType));

    for (const pkgModule of pkgModules) {
      const readmePath = path.resolve(
        LOCAL_LIFT_PATH,
        pkgType,
        pkgModule,
        "README.md"
      );

      let readme = "";

      if (fs.existsSync(readmePath)) {
        readme = fs.readFileSync(
          path.resolve(LOCAL_LIFT_PATH, pkgType, pkgModule, "README.md"),
          "utf-8"
        );
      }

      const directoryFiles = getDirectoryFiles(
        path.resolve(LOCAL_LIFT_PATH, pkgType, pkgModule)
      )
        .filter((file) => file !== "README.md" && file !== ".DS_Store")
        .map((file) => {
          const filePath = path.resolve(
            LOCAL_LIFT_PATH,
            pkgType,
            pkgModule,
            file
          );

          return {
            title: file,
            language: path.extname(file),
            code: fs.readFileSync(filePath, "utf-8"),
          };
        });

      readme += `\n\n## Module files\n\n<CodeBlockTabs codeBlocks={${JSON.stringify(
        directoryFiles
      )}} />`;

      const readmeContent = generateReadme(
        pkgType,
        pkgModule,
        pkgVersion,
        readme
      );
      writeReadmeToContent(pkgType, pkgModule, readmeContent);
    }
  }
}

void main();
