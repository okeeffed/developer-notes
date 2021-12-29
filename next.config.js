const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
// const urlPaths = require("./public/urls.json");

module.exports = {
  // async redirects() {
  //   return urlPaths.redirects;
  // },
  // async headers() {
  //   return [
  //     {
  //       source: "/blog/:slug*(svg|jpg|png)",
  //       locale: false,
  //       headers: [
  //         {
  //           key: "Cache-Control",
  //           value: "public, max-age=2592000, must-revalidate",
  //         },
  //       ],
  //     },
  //   ];
  // },
  images: {
    domains: ["dtyyfw8oh5wdw.cloudfront.net", "cdn.dennisokeeffe.com"],
  },
  webpack: (config, { isServer }) => {
    // config.plugins.push(new DuplicatePackageCheckerPlugin());
    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "server",
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true,
        })
      );
    }
    return config;
  },
};
