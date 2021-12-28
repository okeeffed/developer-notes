// Standup demo
const { createBucket } = require('../index');

const main = async () => {
  await createBucket({ bucket: 'dok-temp-lambda-ci' });
};

main();
