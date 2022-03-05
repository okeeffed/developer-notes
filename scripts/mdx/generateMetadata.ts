import * as fs from "fs";
import path from "path";
import _ from "lodash";
import recursive from "recursive-readdir";

const CONTENT_PATH = path.resolve(__dirname, "../../public/content");

async function main() {
  const files = await recursive(CONTENT_PATH, ["!*.md"]);

  const data = files.map((file) => {
    const relativePath = file.replace(CONTENT_PATH, "");
    const relativePathParts = relativePath.split("/");
    const [, tag, tempFolder] = relativePathParts;
    const label = relativePathParts[relativePathParts.length - 1];

    const folder = tempFolder === label ? null : tempFolder;

    return {
      url: relativePath.replace(".md", ""),
      tag: tag,
      label: label ? label.replace(".md", "") : "home",
      folder: folder,
    };
  });

  fs.writeFileSync(
    path.resolve(__dirname, "../../src/data/_metadata.json"),
    JSON.stringify(
      {
        metadata: data,
      },
      null,
      2
    ),
    "utf-8"
  );
}

main();
