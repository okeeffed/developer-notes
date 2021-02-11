(window.webpackJsonp=window.webpackJsonp||[]).push([[244],{zhIj:function(e,n,t){"use strict";t.r(n),t.d(n,"_frontmatter",(function(){return s})),t.d(n,"default",(function(){return c}));t("1c7q"),t("abGl"),t("gZHo"),t("Fdmb"),t("Ir+3"),t("2mQt"),t("mXGw");var a=t("/FXl"),r=t("TjRS");t("aD51");function o(){return(o=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e}).apply(this,arguments)}var s={};void 0!==s&&s&&s===Object(s)&&Object.isExtensible(s)&&!s.hasOwnProperty("__filemeta")&&Object.defineProperty(s,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"manual/Epic-React/React-Fundamentals.md"}});var i={_frontmatter:s},l=r.a;function c(e){var n=e.components,t=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,["components"]);return Object(a.b)(l,o({},i,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"react-fundamentals"},"React Fundamentals"),Object(a.b)("h2",{id:"resources"},"Resources"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},Object(a.b)("a",o({parentName:"li"},{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script"}),"MDN script tag")),Object(a.b)("li",{parentName:"ol"},Object(a.b)("a",o({parentName:"li"},{href:"https://github.com/facebook/react/blob/fd61f7ea53989a59bc427603798bb111c852816a/packages/react-dom/src/client/ReactDOMComponent.js#L472"}),"React Source Code creating DOM elements")),Object(a.b)("li",{parentName:"ol"},Object(a.b)("a",o({parentName:"li"},{href:"https://ui.dev/imperative-vs-declarative-programming/"}),"Imperative vs Declarative Programming"))),Object(a.b)("h2",{id:"lesson-1"},"Lesson 1"),Object(a.b)("p",null,"The extra credit was more just using JS to create all the DOM nodes:"),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{className:"language-html"}),"<html>\n  <body>\n    <script type=\"module\">\n      // add root div\n      const div = document.createElement('div');\n      div.id = 'root';\n      document.querySelector('body').append(div);\n\n      // add div\n      const newDiv = document.createElement('div');\n      newDiv.textContent = 'Hello World';\n      const rootDiv = document.getElementById('root');\n      rootDiv.append(newDiv);\n    <\/script>\n  </body>\n</html>\n")),Object(a.b)("p",null,"What is interesting here is the usage of ",Object(a.b)("inlineCode",{parentName:"p"},'<script type="module"><\/script>')," which gives support for ES Modules."),Object(a.b)("p",null,"According to ",Object(a.b)("a",o({parentName:"p"},{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script"}),"MDN"),":"),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"Causes the code to be treated as a JavaScript module. The processing of the script contents is not affected by the charset and defer attributes. For information on using module, see our JavaScript modules guide. Unlike classic scripts, module scripts require the use of the CORS protocol for cross-origin fetching.")),Object(a.b)("h2",{id:"lesson-2---raw-react-apis"},"Lesson 2 - Raw React APIs"),Object(a.b)("p",null,"Interesting distinction between React and React DOM:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"React: responsible for creating react elements (kinda like ",Object(a.b)("inlineCode",{parentName:"li"},"document.createElement()"),")"),Object(a.b)("li",{parentName:"ul"},"ReactDOM: responsible for render react elements to the DOM (kinda like ",Object(a.b)("inlineCode",{parentName:"li"},"rootElement.append()"),")")),Object(a.b)("h3",{id:"using-react-with-cdns--inline-js"},"Using React with CDNs + Inline JS"),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{className:"language-html"}),"<body>\n  <div id=\"root\"></div>\n\n  <script src=\"https://unpkg.com/react@16.13.1/umd/react.development.js\"><\/script>\n  <script src=\"https://unpkg.com/react-dom@16.13.1/umd/react-dom.development.js\"><\/script>\n\n  <script type=\"module\">\n    // Grab root element from DOM\n    const rootElement = document.getElementById('root');\n    // Assign props as you normally would\n    const elementProps = {\n      id: 'awesome-new-id',\n      className: 'bg-blue-700',\n      children: 'I have a class and ID!',\n    };\n    const elementType = 'h1';\n\n    // This creates our element imperatively\n    const reactElement = React.createElement(elementType, elementProps);\n    ReactDOM.render(reactElement, rootElement);\n  <\/script>\n</body>\n")),Object(a.b)("p",null,"And to create React components within React components, I went this route to show ",Object(a.b)("inlineCode",{parentName:"p"},"Ayo, World!"),":"),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{className:"language-html"}),"<body>\n  <div id=\"root\"></div>\n\n  <script src=\"https://unpkg.com/react@16.13.1/umd/react.development.js\"><\/script>\n  <script src=\"https://unpkg.com/react-dom@16.13.1/umd/react-dom.development.js\"><\/script>\n\n  <script type=\"module\">\n    // Grab root element from DOM\n    const rootElement = document.getElementById('root');\n\n    const reusableSpan = props => React.createElement('span', props);\n    const divProps = {\n      // Returns React component children\n      children: [\n        reusableSpan({ children: 'Ayo, ' }),\n        reusableSpan({\n          children: 'World!',\n        }),\n      ],\n    };\n    const divElement = React.createElement('div', divProps);\n\n    ReactDOM.render(divElement, rootElement);\n  <\/script>\n</body>\n")),Object(a.b)("p",null,"React also enables us to pass Children as Rest arguments:"),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{className:"language-html"}),"<body>\n  <div id=\"root\"></div>\n\n  <script src=\"https://unpkg.com/react@16.13.1/umd/react.development.js\"><\/script>\n  <script src=\"https://unpkg.com/react-dom@16.13.1/umd/react-dom.development.js\"><\/script>\n\n  <script type=\"module\">\n    // Grab root element from DOM\n    const rootElement = document.getElementById('root');\n\n    const reusableSpan = props => React.createElement('span', props);\n    const divElement = React.createElement(\n      'div',\n      {},\n      reusableSpan({ children: 'Ayo, ' }),\n      reusableSpan({\n        children: 'World!',\n      }),\n    );\n\n    ReactDOM.render(divElement, rootElement);\n  <\/script>\n</body>\n")),Object(a.b)("h2",{id:"using-jsx"},"Using JSX"),Object(a.b)("p",null,"The better you become at understanding ",Object(a.b)("inlineCode",{parentName:"p"},"React.createElement"),", the better you will become with JSX."),Object(a.b)("p",null,"We can begin to start using JSX in the HTML thanks to Babel!"),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{className:"language-html"}),'<body>\n  <div id="root"></div>\n  <script src="https://unpkg.com/react@16.13.1/umd/react.development.js"><\/script>\n  <script src="https://unpkg.com/react-dom@16.13.1/umd/react-dom.development.js"><\/script>\n\n  <script src="https://unpkg.com/@babel/standalone@7.9.3/babel.js"><\/script>\n\n  <script type="text/babel">\n    const className = \'container\';\n    const children = \'Hello World\';\n    const element = <div className={className}>{children}</div>;\n    ReactDOM.render(element, document.getElementById(\'root\'));\n  <\/script>\n</body>\n')),Object(a.b)("p",null,"Extra credit: spreads."),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{className:"language-html"}),'<body>\n  <div id="root"></div>\n  <script src="https://unpkg.com/react@16.13.1/umd/react.development.js"><\/script>\n  <script src="https://unpkg.com/react-dom@16.13.1/umd/react-dom.development.js"><\/script>\n\n  <script src="https://unpkg.com/@babel/standalone@7.9.3/babel.js"><\/script>\n\n  <script type="text/babel">\n    const children = \'Hello World\';\n    const className = \'container\';\n    const props = { children, className };\n    const element = <div {...props} />;\n    ReactDOM.render(element, document.getElementById(\'root\'));\n  <\/script>\n</body>\n')),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"Note: with JSX, you cannot write a statement ie if-else, etc.")),Object(a.b)("p",null,"For the extra credit - there was a nice explanation of Babel converting spreads within the ",Object(a.b)("inlineCode",{parentName:"p"},"<div {...props} />"),' to use an "extend" transform where the ',Object(a.b)("strong",{parentName:"p"},"order matters")," ie if you put ",Object(a.b)("inlineCode",{parentName:"p"},"id")," before or after the spread, that will effect the end result."),Object(a.b)("h2",{id:"creating-custom-components"},"Creating Custom Components"),Object(a.b)("p",null,"Something interesting is that in the below, the ",Object(a.b)("inlineCode",{parentName:"p"},"helloElement")," creates a custom ",Object(a.b)("inlineCode",{parentName:"p"},"message")," component, whereas call ",Object(a.b)("inlineCode",{parentName:"p"},"message")," directly ",Object(a.b)("strong",{parentName:"p"},"does not create a custom component"),"."),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{className:"language-js"}),"function message({ children }) {\n  return <div classNane=\"message\">{children}</div>;\n}\n\nconst helloElement = React.createElement(message, {children: 'Hello!'})\n\nconst element = {\n  <div className=\"container\">\n    {helloElement}\n    {message({children: 'World!'})}\n  </div>\n}\n")),Object(a.b)("h3",{id:"capitalizing-components"},"Capitalizing Components"),Object(a.b)("p",null,"Why does ",Object(a.b)("inlineCode",{parentName:"p"},"message")," not work but ",Object(a.b)("inlineCode",{parentName:"p"},"Message")," work? If you look at Babel, you get answers from the transpilation."),Object(a.b)("p",null,"With React specifications, starting the function with a capital letter will help Babel know how to transform the custom components."),Object(a.b)("h2",{id:"basic-forms"},"Basic Forms"),Object(a.b)("p",null,"In this exercise, we simply discussed ways to submit to a form."),Object(a.b)("p",null,"The default HTML submit behaviour is prevented using ",Object(a.b)("inlineCode",{parentName:"p"},"event.preventDefault()"),", and the value can be abstracted using ",Object(a.b)("inlineCode",{parentName:"p"},"e.target[number].value")," or, in a better method, using ",Object(a.b)("inlineCode",{parentName:"p"},"e.target.elements[idOfElement]"),"."),Object(a.b)("p",null,"The solution is as follows:"),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{className:"language-js"}),'// Basic Forms\n// http://localhost:3000/isolated/exercise/06.js\n\nimport React from \'react\';\n\nfunction UsernameForm({ onSubmitUsername }) {\n  // 🐨 add a submit event handler here (`handleSubmit`).\n  // 💰 Make sure to accept the `event` as an argument and call\n  // `event.preventDefault()` to prevent the default behavior of form submit\n  // events (which refreshes the page).\n  const handleSubmit = e => {\n    e.preventDefault();\n    const { username } = e.target.elements;\n    onSubmitUsername(username.value);\n  };\n  // 🐨 get the value from the username input (using whichever method\n  // you prefer from the options mentioned in the instructions)\n  // 💰 For example: event.target.elements[0]\n  // 🐨 Call `onSubmitUsername` with the value of the input\n\n  // 🐨 add the onSubmit handler to the <form> below\n\n  // 🐨 make sure to associate the label to the input by specifying an `id` on\n  // the input and a matching value as an `htmlFor` prop on the label.\n  return (\n    <form onSubmit={handleSubmit}>\n      <div>\n        <label htmlFor="username">Username:</label>\n        <input id="username" type="text" />\n      </div>\n      <button type="submit">Submit</button>\n    </form>\n  );\n}\n\nfunction App() {\n  const onSubmitUsername = username => alert(`You entered: ${username}`);\n  return <UsernameForm onSubmitUsername={onSubmitUsername} />;\n}\n\nexport default App;\n')),Object(a.b)("h3",{id:"using-refs"},"Using Refs"),Object(a.b)("p",null,"Another alternative is to use refs to get our target value."),Object(a.b)("p",null,"Kent mentions that he would stick to the original method but wanted to demonstrate examples."),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{className:"language-js"}),'import React, { useRef } from \'react\';\n\nfunction UsernameForm({ onSubmitUsername }) {\n  const usernameRef = useRef();\n\n  const handleSubmit = e => {\n    e.preventDefault();\n    const username = usernameRef.current.value;\n    onSubmitUsername(username);\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <div>\n        <label htmlFor="username">Username:</label>\n        <input ref={usernameRef} id="username" type="text" />\n      </div>\n      <button type="submit">Submit</button>\n    </form>\n  );\n}\n\nfunction App() {\n  const onSubmitUsername = username => alert(`You entered: ${username}`);\n  return <UsernameForm onSubmitUsername={onSubmitUsername} />;\n}\n\nexport default App;\n')),Object(a.b)("h3",{id:"validation-extra-credit"},"Validation Extra Credit"),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{className:"language-js"}),'// Basic Forms\n// http://localhost:3000/isolated/exercise/06.js\n\nimport React, { useState } from \'react\';\n\nfunction UsernameForm({ onSubmitUsername }) {\n  const [isValid, setIsValid] = useState(true);\n\n  const handleChange = e => {\n    const username = e.target.value;\n    const isValid = username === username.toLowerCase();\n    setIsValid(isValid);\n  };\n\n  const handleSubmit = e => {\n    e.preventDefault();\n    const { username } = e.target.elements;\n    onSubmitUsername(username.value);\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <div>\n        <label htmlFor="username">Username:</label>\n        <input onChange={handleChange} id="username" type="text" />\n        {!isValid && <p>The value is invalid</p>}\n      </div>\n      <button type="submit">Submit</button>\n    </form>\n  );\n}\n\nfunction App() {\n  const onSubmitUsername = username => alert(`You entered: ${username}`);\n  return <UsernameForm onSubmitUsername={onSubmitUsername} />;\n}\n\nexport default App;\n')),Object(a.b)("h3",{id:"controlled-form-extra-credit"},"Controlled Form Extra Credit"),Object(a.b)("p",null,"To validate our form to show that the value is all lower case, we can add a function to enable this."),Object(a.b)("pre",null,Object(a.b)("code",o({parentName:"pre"},{className:"language-js"}),'// Basic Forms\n// http://localhost:3000/isolated/exercise/06.js\n\nimport React, { useState } from \'react\';\n\nfunction UsernameForm({ onSubmitUsername }) {\n  const [username, setUsername] = useState(\'\');\n  const [isValid, setIsValid] = useState(true);\n\n  const handleChange = e => {\n    const username = e.target.value;\n\n    const isValid = username === username.toLowerCase();\n    setIsValid(isValid);\n\n    setUsername(username);\n  };\n\n  const handleSubmit = e => {\n    e.preventDefault();\n    const { username } = e.target.elements;\n    onSubmitUsername(username.value);\n  };\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <div>\n        <label htmlFor="username">Username:</label>\n        <input\n          onChange={handleChange}\n          id="username"\n          type="text"\n          value={username}\n        />\n        {!isValid && <p>The value is invalid</p>}\n      </div>\n      <button disabled={!isValid} type="submit">\n        Submit\n      </button>\n    </form>\n  );\n}\n\nfunction App() {\n  const onSubmitUsername = username => alert(`You entered: ${username}`);\n  return <UsernameForm onSubmitUsername={onSubmitUsername} />;\n}\n\nexport default App;\n')),Object(a.b)("h2",{id:"rendering-arrays"},"Rendering Arrays"),Object(a.b)("p",null,"This is a last fundamental look at array rendering."),Object(a.b)("p",null,"The gist of it is that you should use a specific ",Object(a.b)("inlineCode",{parentName:"p"},"key")," that is not the index to ensure there is no unusual behaviour and that focus can follow around on the page."))}c&&c===Object(c)&&Object.isExtensible(c)&&!c.hasOwnProperty("__filemeta")&&Object.defineProperty(c,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"manual/Epic-React/React-Fundamentals.md"}}),c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---manual-epic-react-react-fundamentals-md-b0a3fe4fe20e316d890e.js.map