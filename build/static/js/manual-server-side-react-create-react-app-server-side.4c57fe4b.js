(window.webpackJsonp=window.webpackJsonp||[]).push([[447],{"./manual/Server-Side-React/Create-React-App-Server-Side.md":function(e,n,t){"use strict";t.r(n),t.d(n,"default",function(){return p});var a=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),r=(t("./node_modules/react/index.js"),t("./node_modules/@mdx-js/react/dist/index.es.js")),s={},o="wrapper";function p(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(r.b)(o,Object.assign({},s,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"create-react-app-server-side-bootstrapping"},"create-react-app Server Side bootstrapping"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"npm run eject"),Object(r.b)("li",{parentName:"ol"},"Update config/paths.js")),Object(r.b)("pre",null,Object(r.b)("code",Object.assign({parentName:"pre"},{className:"language-javascript"}),"// config/paths.js\n\nmodule.exports = {\n    ...\n    appServer: resolveApp('server'),\n    serverIndexJs: resolveApp('src/server.js'),\n    ...\n}\n")),Object(r.b)("ol",{start:3},Object(r.b)("li",{parentName:"ol"},"Create a ",Object(r.b)("inlineCode",{parentName:"li"},"webpack.config.server.js")," file."),Object(r.b)("li",{parentName:"ol"},"Install ",Object(r.b)("inlineCode",{parentName:"li"},"webpack-node-externals"),".")),Object(r.b)("p",null,"As described on the github:"),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"Webpack allows you to define externals - modules that should not be bundled.")),Object(r.b)("p",null,Object(r.b)("em",{parentName:"p"},"When bundling with Webpack for the backend - you usually don't want to bundle its node_modules dependencies. This library creates an externals function that ignores node_modules when bundling in Webpack.")),Object(r.b)("pre",null,Object(r.b)("code",Object.assign({parentName:"pre"},{}),"const path = require('path');\nconst paths = require('./paths');\nconst webpackNodeExternals = require('webpack-node-externals');\n\nmodule.exports = {\n    // Target Nodehs\n    target: 'node',\n    // Looking for the root of server app\n    entry: paths.serverIndexJs,\n    output: {\n        // The build folder.\n        path: paths.appServer,\n        filename: 'server.js'\n    },\n    // Run Babel on every file\n    module: {\n        rules: [\n            {\n                test: /\\.js?$/,\n                loader: 'babel-loader',\n                exclude: /node_modules/,\n                options: {\n                    presets: [\n                        'react',\n                        'stage-0',\n                        ['env', { targets: { browsers: ['last 2 versions']}}]\n                    ]\n                }\n            }\n        ]\n    },\n    externals: [webpackNodeExternals()]\n}\n")))}p&&p===Object(p)&&Object.isExtensible(p)&&Object.defineProperty(p,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"manual/Server-Side-React/Create-React-App-Server-Side.md"}}),p.isMDXComponent=!0}}]);
//# sourceMappingURL=manual-server-side-react-create-react-app-server-side.101a1afd2417ec7a4a77.js.map