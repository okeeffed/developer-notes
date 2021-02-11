(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{dQln:function(e,n,a){"use strict";a.r(n),a.d(n,"_frontmatter",(function(){return o})),a.d(n,"default",(function(){return c}));a("1c7q"),a("abGl"),a("gZHo"),a("Fdmb"),a("Ir+3"),a("2mQt"),a("mXGw");var t=a("/FXl"),r=a("TjRS");a("aD51");function i(){return(i=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&(e[t]=a[t])}return e}).apply(this,arguments)}var o={};void 0!==o&&o&&o===Object(o)&&Object.isExtensible(o)&&!o.hasOwnProperty("__filemeta")&&Object.defineProperty(o,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"manual/AWS/AWS-NodeSDK.md"}});var s={_frontmatter:o},l=r.a;function c(e){var n=e.components,a=function(e,n){if(null==e)return{};var a,t,r={},i=Object.keys(e);for(t=0;t<i.length;t++)a=i[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,["components"]);return Object(t.b)(l,i({},s,a,{components:n,mdxType:"MDXLayout"}),Object(t.b)("h1",{id:"aws-node-sdk"},"AWS Node SDK"),Object(t.b)("ul",null,Object(t.b)("li",{parentName:"ul"},Object(t.b)("a",i({parentName:"li"},{href:"#aws-node-sdk"}),"AWS Node SDK"),Object(t.b)("ul",{parentName:"li"},Object(t.b)("li",{parentName:"ul"},Object(t.b)("a",i({parentName:"li"},{href:"#loading-credentials-in-nodejs-from-environment-variables"}),"Loading Credentials in Node.js from Environment Variables")),Object(t.b)("li",{parentName:"ul"},Object(t.b)("a",i({parentName:"li"},{href:"#example-use-in-a-task-runner---get-ec2-details-back"}),"Example use in a task runner - get EC2 Details back"))))),Object(t.b)("h2",{id:"loading-credentials-in-nodejs-from-environment-variables"},"Loading Credentials in Node.js from Environment Variables"),Object(t.b)("ul",null,Object(t.b)("li",{parentName:"ul"},"AWS_ACCESS_KEY_ID"),Object(t.b)("li",{parentName:"ul"},"AWS_SECRET_ACCESS_KEY"),Object(t.b)("li",{parentName:"ul"},"AWS_SESSION_TOKEN (optional)")),Object(t.b)("p",null,"These can be set into your ENV variables."),Object(t.b)("h2",{id:"example-use-in-a-task-runner---get-ec2-details-back"},"Example use in a task runner - get EC2 Details back"),Object(t.b)("pre",null,Object(t.b)("code",i({parentName:"pre"},{className:"language-javascript"}),"var fs = require('fs');\nconst util = require('util');\nvar dotenv = require('dotenv');\nvar envConfig = dotenv.parse(fs.readFileSync('.env'));\nfor (var k in envConfig) {\n    process.env[k] = envConfig[k];\n}\n\nvar gulp = require('gulp');\n\n// Load the SDK for JavaScript\nvar AWS = require('aws-sdk');\n\nvar params = {\n    InstanceIds: [process.env.EC2_INSTANCE_ID]\n};\n\n/* Get EC2 Details */\ngulp.task('info', function() {\n    AWS.config = {\n        accessKeyId: process.env.AWS_ACCESS_KEY,\n        secretAccessKey: process.env.AWS_SECRET_KEY,\n        region: process.env.AWS_REGION\n    };\n\n    // Create EC2 service object\n    ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });\n\n    // Call EC2 to retrieve the policy for selected bucket\n    ec2.describeInstances(params, function(err, data) {\n        if (err) {\n            console.log('Error', err.stack);\n        } else {\n            console.log('Success', util.inspect(data, { depth: 6 }));\n        }\n    });\n});\n")))}c&&c===Object(c)&&Object.isExtensible(c)&&!c.hasOwnProperty("__filemeta")&&Object.defineProperty(c,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"manual/AWS/AWS-NodeSDK.md"}}),c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---manual-aws-aws-node-sdk-md-711ada2ab03214d96cd5.js.map