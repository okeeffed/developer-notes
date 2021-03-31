const fs = require("fs-extra");
const recursive = require("recursive-readdir");

const BASE_PATH = `/Users/dennisokeeffe/code/personal/developer-notes-nextjs/pages`;
const TARGET_PATH = `/Users/dennisokeeffe/code/personal/developer-notes-nextjs/public`;

async function main() {
  const files = await recursive(BASE_PATH, ["!*.png"]);

  for (const file of files) {
    const filenameArr = file.split("/");
    const filename = filenameArr[filenameArr.length - 1];
    fs.moveSync(file, `${TARGET_PATH}/${filename}`);
  }
}

main();
