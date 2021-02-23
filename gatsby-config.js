const fs = require('fs');
const gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);

//gatsby-config.js
module.exports = {
  plugins: ['gatsby-plugin-sass'],
};
