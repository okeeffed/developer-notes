import { ImagePool } from "@squoosh/lib";
import recursive from "recursive-readdir";
import path from "path";
import prompts from "prompts";
import ora from "ora";
import { writeFileSync } from "fs";

async function main() {
  const response = await prompts({
    type: "text",
    name: "path",
    message: "What is the image folder directory?",
  });

  const files = await recursive(path.resolve(process.cwd(), response.path));

  const imagePool = new ImagePool();

  for (const imagePath of files) {
    const spinner = ora(imagePath).start();

    const image = imagePool.ingestImage(imagePath);

    await image.decoded; //Wait until the image is decoded before running preprocessors.

    const preprocessOptions = {
      resize: {
        enabled: true,
        width: 1000, // specified ratio for website
      },
    };
    await image.preprocess(preprocessOptions);

    const encodeOptions = {
      oxipng: {}, //an empty object means 'use default settings'
    };
    await image.encode(encodeOptions);

    const rawEncodedImage = (await image.encodedWith.oxipng).binary;
    writeFileSync(imagePath, rawEncodedImage);
    spinner.succeed();
  }

  await imagePool.close();
}

main();
