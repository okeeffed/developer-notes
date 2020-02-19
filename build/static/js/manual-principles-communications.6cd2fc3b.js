(window.webpackJsonp=window.webpackJsonp||[]).push([[342],{"./manual/Principles/Communications.md":function(e,n,t){"use strict";t.r(n),t.d(n,"default",function(){return l});var a=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),o=(t("./node_modules/react/index.js"),t("./node_modules/@mdx-js/react/dist/index.es.js")),r={},i="wrapper";function l(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(o.b)(i,Object.assign({},r,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("h1",{id:"communications"},"Communications"),Object(o.b)("p",null,"This should cover things like logging, tracing etc."),Object(o.b)("p",null,Object(o.b)("a",Object.assign({parentName:"p"},{href:"https://medium.freecodecamp.org/how-you-can-improve-your-workflow-using-the-javascript-console-bdd7823a9472"}),"This article is a great reference.")),Object(o.b)("h2",{id:"table-of-contents"},"Table of contents"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object.assign({parentName:"li"},{href:"#communications"}),"Communications"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object.assign({parentName:"li"},{href:"#table-of-contents"}),"Table of contents")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object.assign({parentName:"li"},{href:"#logging"}),"Logging"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object.assign({parentName:"li"},{href:"#console-logging-in-the-browser"}),"Console logging in the browser")))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object.assign({parentName:"li"},{href:"#practical-usage"}),"Practical usage"),Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object.assign({parentName:"li"},{href:"#logging-keys"}),"Logging keys")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object.assign({parentName:"li"},{href:"#example-class"}),"Example Class")))),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object.assign({parentName:"li"},{href:"#other-tips-and-gotchas"}),"Other tips and gotchas"))))),Object(o.b)("h2",{id:"logging"},"Logging"),Object(o.b)("h3",{id:"console-logging-in-the-browser"},"Console logging in the browser"),Object(o.b)("p",null,"We have a few methods we can use with ",Object(o.b)("inlineCode",{parentName:"p"},"console")," to help us be more proficient on how we log:"),Object(o.b)("pre",null,Object(o.b)("code",Object.assign({parentName:"pre"},{}),".log\n.info\n.warn\n.error\n.table\n.time(key)\n.group\n.groupEnd\n.trace\n.assert\n")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Guidelines:")),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"When going through a process across files and functions, attempt to use group to log the process."),Object(o.b)("li",{parentName:"ol"},"Assertions may also become handy when ",Object(o.b)("inlineCode",{parentName:"li"},"if/else")," logic is involved for logging purposes."),Object(o.b)("li",{parentName:"ol"},"Ensure these logs only show when running in a certain environment (ie not in production mode).")),Object(o.b)("h2",{id:"practical-usage"},"Practical usage"),Object(o.b)("p",null,"These are more guidelines that take influence from languages like Objective-C and personal decisions."),Object(o.b)("h3",{id:"logging-keys"},"Logging keys"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",Object.assign({parentName:"tr"},{align:null}),"Type"),Object(o.b)("th",Object.assign({parentName:"tr"},{align:null}),"Key"),Object(o.b)("th",Object.assign({parentName:"tr"},{align:null}),"Example"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"Error"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"!"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"console.error('! description', error);")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"Warning"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"?"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"console.warn('? description');")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"Functions"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),">"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"console.group('> fileName.functionName');")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"Instance methods"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"-"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"console.group('- className.methodName');")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"Static methods"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"+"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"console.group('+ className.staticMethodName');")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"Debug level 1"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"#"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"console.log('# importantDebugMessage');")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"Debug level 2"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"##"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"console.log('## moreImportantDebugMessage');")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"Debug level 3"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"###"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"console.log('### mostImportantDebugMessage');")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"Event"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"@"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"console.log('@ analyticsEndpoint:', data);")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"Success"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"$"),Object(o.b)("td",Object.assign({parentName:"tr"},{align:null}),"console.log('$ message');")))),Object(o.b)("h3",{id:"example-class"},"Example Class"),Object(o.b)("pre",null,Object(o.b)("code",Object.assign({parentName:"pre"},{className:"language-javascript"}),"import React, {Component} from 'react';\nimport Emitter from 'common/Emitter';\nimport Config from 'src/app.json';\nimport Waypoint from 'react-waypoint';\n\n/**\n * Render the ComponentALLandingFive component\n *\n * @class ComponentALLandingFive\n * @extends {Component}\n */\nclass ComponentALLandingFive extends Component {\n    /**\n     * Handle primary button click event.\n     *\n     * @memberof ComponentALLandingFive\n     */\n    handlePrimaryClick = e => {\n        console.group('- ComponentALLandingFive.handlePrimaryClick');\n        Emitter.emit('event', {\n            event: 'ComponentALLandingFive.handlePrimaryClick',\n            e: e.target,\n            data: {\n                href: '/'\n            }\n        });\n\n        if (Config.debug) {\n            e.preventDefault();\n            console.warn('? Debug mode: early return');\n            console.groupEnd();\n            return;\n        }\n\n        const {router} = this.props;\n        router.push(Config.baseUrl + '/test');\n        console.groupEnd();\n    }\n\n    /**\n     * Handle secondary button click event.\n     *\n     * @memberof ComponentALLandingFive\n     */\n    handleSecondaryClick = e => {\n        console.group('- ComponentALLandingFive.handleSecondaryClick');\n        Emitter.emit('event', {\n            event: 'ComponentALLandingFive.handleSecondaryClick',\n            e: e.target,\n            data: {\n                href: '/'\n            }\n        });\n\n        if (Config.debug) {\n            e.preventDefault();\n            console.warn('? Debug mode: early return');\n            console.groupEnd();\n            return;\n        }\n\n        const {router} = this.props;\n        router.push(Config.baseUrl + '/test');\n        console.groupEnd();\n    }\n\n    /**\n     * Handle component enter event.\n     *\n     * @memberof ComponentALLandingFive\n     */\n    handleWaypointEnter = e => {\n        console.log('- ComponentALLandingFive.handleWaypointEnter');\n        Emitter.emit('event', {event: 'ComponentALLandingFive.handleWaypointEnter'});\n    }\n\n    /**\n     * Handle component exit event.\n     *\n     * @memberof ComponentALLandingFive\n     */\n    handleWaypointExit = e => {\n        console.log('- ComponentALLandingFive.handleWaypointExit');\n        Emitter.emit('event', {event: 'ComponentALLandingFive.handleWaypointExit'});\n    }\n\n    /**\n     * Render ComponentALLandingFive component\n     * @memberof ComponentALLandingFive\n     * @var {function} render Render ComponentALLandingFive component\n     * @returns {Object} component\n     */\n    render() {\n        // omitted for brevity\n    }\n}\n\nexport default ComponentALLandingFive;\n")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Note:"),' In the below gif, the "analytics" logs come from the Emitter module class.'),Object(o.b)("p",null,Object(o.b)("img",{alt:"Example in action",src:"https://res.cloudinary.com/gitgoodclub/image/upload/v1539219876/gifAnalytics.gif"})),Object(o.b)("h2",{id:"other-tips-and-gotchas"},"Other tips and gotchas"),Object(o.b)("p",null,"If there is a possibility of an early return or error when logging and using groups, ensure that you adequately close the group off properly. If you cannot ensure that a group will close (ie entering a zone, mouse hover etc may not exit) then avoid the use of a group for that event and rely more on logs."))}l&&l===Object(l)&&Object.isExtensible(l)&&Object.defineProperty(l,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"manual/Principles/Communications.md"}}),l.isMDXComponent=!0}}]);
//# sourceMappingURL=manual-principles-communications.101a1afd2417ec7a4a77.js.map