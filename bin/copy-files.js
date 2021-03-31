const fs = require("fs-extra");
const recursive = require("recursive-readdir");

const BASE_PATH = "/Users/dennisokeeffe/code/personal/developer-notes/manual";
const TARGET_PATH = `/Users/dennisokeeffe/code/personal/developer-notes-nextjs/pages`;

async function main() {
  const files = await recursive(BASE_PATH, ["!*.md"]);

  for (const file of files) {
    const contents = fs.readFileSync(file, "utf-8");
    const filenameArr = file.replace(`${BASE_PATH}/`, "").split("/");
    const [directory, filenameWithExt] = filenameArr;

    const filenameAsMdx = filenameWithExt.replace(".md", ".mdx");
    const filePath = `${TARGET_PATH}/${directory.toLowerCase()}/${filenameAsMdx.toLowerCase()}`;
    fs.ensureFileSync(filePath);
    fs.writeFileSync(filePath, contents, "utf-8");
  }
}

main();
