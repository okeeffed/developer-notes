import * as fs from "fs";
import path from "path";
import _ from "lodash";

const CONTENT_PATH = path.resolve(__dirname, "../../public/content");

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

function recursiveSidebar(
  sidebarJson,
  targetPath,
  key = "sidebar",
  title = "Home",
  level = 0
) {
  const relativePath = targetPath.replace(CONTENT_PATH, "");
  const files = getDirectoryFiles(targetPath);
  const directories = getDirectories(targetPath);

  _.set(sidebarJson, key, {
    title: _.capitalize(title.replace(/-/g, " ")),
    // isDirectory: true,
    // href: relativePath === "" ? "/" : `/${key}`,
  });

  files.forEach((file, index) => {
    if (level === 0) {
      _.set(sidebarJson, `${key}.files.${index}`, {
        title: "Home",
        // isDirectory: false,
        href: `/`,
      });
    } else if (/\.mdx$/.test(file)) {
      // base case: ensure it is mdx file
      _.set(sidebarJson, `${key}.files.${index}`, {
        title: _.capitalize(file.replace(/\.mdx$/, "").replace(/-/g, " ")),
        // isDirectory: false,
        href: `${relativePath}/${file.replace(/\.mdx$/, "")}`,
      });
    }
  });

  directories.forEach((dir, index) => {
    recursiveSidebar(
      sidebarJson,
      path.resolve(targetPath, dir),
      `${key}.dirs.${index}`,
      dir,
      level + 1
    );
  });
}

async function main() {
  let sidebarJson = {
    sidebar: [],
  };

  recursiveSidebar(sidebarJson, CONTENT_PATH);

  fs.writeFileSync(
    path.resolve(__dirname, "../../src/data/_sidebar.json"),
    JSON.stringify(sidebarJson, null, 2),
    "utf-8"
  );
}

main();
