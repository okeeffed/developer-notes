import * as fs from "fs";
import path from "path";
import _ from "lodash";
import recursive from "recursive-readdir";

const CONTENT_PATH = path.resolve(__dirname, "../../public/content");

async function main({ fromExt, toExt }: { fromExt: string; toExt: string }) {
  const files = await recursive(CONTENT_PATH, ["!*.md"]);

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    fs.writeFileSync(file.replace(fromExt, toExt), content, "utf-8");
    fs.rmSync(file);
  }
}

main({ fromExt: ".mdx", toExt: ".md" });
