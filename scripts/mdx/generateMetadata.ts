import * as fs from "fs";
import path from "path";
import _ from "lodash";
import recursive from "recursive-readdir";

const CONTENT_PATH = path.resolve(__dirname, "../../public/content");

async function main() {
  const files = await recursive(CONTENT_PATH, ["!*.mdx"]);

  const data = files.map((file) => {
    const relativePath = file.replace(CONTENT_PATH, "");
    const [, tag, label] = relativePath.split("/");

    return {
      url: relativePath.replace(".mdx", ""),
      tag: tag,
      label: label ? label.replace(".mdx", "") : "home",
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
