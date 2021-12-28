// Teardown demo
const { deleteBucket } = require('../index');

const main = async () => {
  await deleteBucket({ bucket: 'dok-temp-lambda-ci' });
};

main();
