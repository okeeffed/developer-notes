const { mergeWith } = require('lodash/fp')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Documentation',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: false,
        o: false,
        open: false,
        'open-browser': false,
        root: '/Users/dennis.okeeffe/Project-Imposter/developer-notes/.docz',
        base: '/',
        source: './',
        src: './',
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: './build',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Documentation',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/dennis.okeeffe/Project-Imposter/developer-notes',
          templates:
            '/Users/dennis.okeeffe/Project-Imposter/developer-notes/node_modules/docz-core/dist/templates',
          docz: '/Users/dennis.okeeffe/Project-Imposter/developer-notes/.docz',
          cache:
            '/Users/dennis.okeeffe/Project-Imposter/developer-notes/.docz/.cache',
          app:
            '/Users/dennis.okeeffe/Project-Imposter/developer-notes/.docz/app',
          appPackageJson:
            '/Users/dennis.okeeffe/Project-Imposter/developer-notes/package.json',
          gatsbyConfig:
            '/Users/dennis.okeeffe/Project-Imposter/developer-notes/gatsby-config.js',
          gatsbyBrowser:
            '/Users/dennis.okeeffe/Project-Imposter/developer-notes/gatsby-browser.js',
          gatsbyNode:
            '/Users/dennis.okeeffe/Project-Imposter/developer-notes/gatsby-node.js',
          gatsbySSR:
            '/Users/dennis.okeeffe/Project-Imposter/developer-notes/gatsby-ssr.js',
          importsJs:
            '/Users/dennis.okeeffe/Project-Imposter/developer-notes/.docz/app/imports.js',
          rootJs:
            '/Users/dennis.okeeffe/Project-Imposter/developer-notes/.docz/app/root.jsx',
          indexJs:
            '/Users/dennis.okeeffe/Project-Imposter/developer-notes/.docz/app/index.jsx',
          indexHtml:
            '/Users/dennis.okeeffe/Project-Imposter/developer-notes/.docz/app/index.html',
          db:
            '/Users/dennis.okeeffe/Project-Imposter/developer-notes/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
