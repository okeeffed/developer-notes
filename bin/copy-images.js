const fs = require("fs-extra");
const recursive = require("recursive-readdir");

const BASE_PATH = "/Users/dennisokeeffe/code/personal/developer-notes/manual";
const TARGET_PATH = `/Users/dennisokeeffe/code/personal/developer-notes-nextjs/pages`;

async function main() {
  const files = await recursive(BASE_PATH, ["!*.jpeg"]);

  for (const file of files) {
    const filename = file.replace(`${BASE_PATH}/`, "");
    const filePath = `${TARGET_PATH}/${filename.toLowerCase()}`;
    fs.copySync(file, filePath);
  }
}

main();
