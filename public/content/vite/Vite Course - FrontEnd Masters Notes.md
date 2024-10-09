## Reading and further resourves

1. https://github.com/vitejs/awesome-vite#plugins
2. https://vite.dev/
3. https://vite-workshop.vercel.app

## 1. Introduction to Vite

A pleasant surprise the speaker found as it come as part of SvelteKit.

It calls itself the next generation of build tooling.

This course follows a few "acts":

1. Vite is simple
2. Vite is powerful
3. Vite is flexible
4. Vite is extensible

Note: I will likely skip over some of the frontend specific content in favour of looking for things that might be more useful for Node.js as I am looking at this for work. I will come back to the frontend sections at the end.

### What is Vite?

It uses a number of tools to be what is is:

1. esbuild (written in Go)
2. Vite then serves those modules as native ESModules. The browser is doing the job of the bundler.
3. You can also use things like `swc`, but at the time of the video, it is still using rollup.js.

### Extra credit

Some things I found while searching through some docs https://github.com/vitejs/awesome-vite#plugins

## 2. Initial setup

### 2.1 Vite starter

The only things you really need is to install Vite and a `index.html` file.

There will also be a number of create vite application options.

In the example, the requirement is to start adding in some CSS and JS.

An `index.js` file was created and the file was added as a script tag in the `index.html` file. The example also demonstrates using the script tag with `type="module"` for ESModules. This demonstrates all that was taken to get Vite working.

Following this, he runs build to demonstrate was Vite builds out. It compiles the JavaScript into an asset that has tree-shaking applied, but also demonstrates all the build output for the assets (including html, images etc).

### 2.2 Dynamic Import & Code Splitter

This video demonstrates dynamic imports and demonstrates the output. This will generate a second asset that is dynamically fetched and imported when this line of code is hit as the import like is a promise.

After this demonstration, there is a `npx vite preview` that demonstrates the production build. Super nice.

## 3. Styling with Vite

### 3.1 Import CSS & CSS Modules

In this example, we first demonstrate the importing of a stylesheet from a link tag. The build also transforms the CSS after adding this.

If we instead used the CSS within a JS file, it will also know to associate the CSS file when the JS is loaded. This obviously does not need the link tag to import the stylesheet with this approach.

When it comes to CSS Modules, we can have CSS scoped only to specific JS module. If we use `name.module.css` then Vite will automatically know how to handle this as well. The demonstration logs out the import to demonstrate the dynamic classname.

### 3.3 Configure PostCSS & CSS Preprocessors

This covers various ways to process CSS.

Some specific notes can be found here at https://vite-workshop.vercel.app/postcss and https://postcss.org/docs/postcss-plugins

There are a whole bunch of utilities that you can find in there.

In the example, he demonstrates `postcss-nested`. This adds the "nested" syntax so thing like `&:hover` etc are available to be used in the source CSS files.

A PostCSS configuration file was then created to demonstrate the usage. Vite by default will also look for that configuration file, so we really didn't need to make any additional adjustments at all and at this point we still do not need a Vite configuration file.

## 4. TypeScript and Frameworks

### 4.1 Configure TypeScript

TypeScript is supported simply by using the correct file extensions. Please note though, that Vite **will not do those type checks for you**. Vite aims to be fast, so it omits that part of the process.

### 4.2 Vite Templates

The tl;dr is that you use a create vite preset, for example `npm create vite@latest vite-react`.

If you really wanted to, you could even write your own framework and add it as a plugin. 

There was also a link for `npx degit <origin repo>` that will clone a repo and then remove git history.

## 5. Assets & Imports

### 5.1 Static Assets

This video walks through imports for things like images and font assets, etc.

By default, it's effectively a "lift-and-shift" approach for the build, but we can do processing as desired.

The first example shown is an image that was added to the `index.html` file. The image itself is a large asset, so the demonstration walks through optimisations for this.

For starters, there is an example shown where the image is imported via a private directory into JavaScript. The import of the image gives the URL, and now building processes the image (albeit without much optimisation). Something interesting that is highlighted is that Vite actually makes decisions about big images and small images, then it'll end up different for both hashing and inlining. With the example of the small image, the image itself was inlined as a base64 image (this was only visible when running preview of the build).

### 5.3 Vite Image Tools

This section demonstrates `vite-imagestools` which under the hood uses `sharp` for making image optimisations.

For this work, you need to have a Vite configuration file. This video also demonstrated adding the Vite plugin, which is similar to the processes that we've seen before.

### 5.4 Directives

So now that the Vite plugin for image tools was installed, how is it that we process things?

By default, we can update the import to have something like `import img from './img?h=400&format=webp` etc and the image optimisations will be applied.

Logging it in dev will actually show the proxy URL used. If we append `as=metadata` we can see more information about the image data as well. 

There is also an example where importing it multiple times with different directives can create different versions for fallbacks. Whether or not you would want to do in practice, it is probably situation specific.

After the images, there were also directives demonstrated with css inline and code raw directives to see more information about the imports. There was also a demonstration of a dynamic import plugin for helping around that.

### 5.5 import.meta

Steve demonstrates how `import.meta` works and how it shows some important Environment variables. Some of this stuff was used for conditional rendering of the dev version of the course website.

If you're using TypeScript, then there was a declaration file added for a reference to vite/client. You can also provide a specific interface for env variables, but best to refer to the latest docs for that one.

### 5.6 JSON named exports

Vite understands that you might only need certain parts of a JSON file. So instead of pulling in the entire JSON file, you can in fact narrow it down to save sweet bytes.  

In the demonstration of the example, it actually demonstrates how the entire JSON file is built as a JS file and exports are available to enable tree shaking. This all comes under the hood for free.

### 5.7 Glob imports

Another powerful Vite feature is using Glob imports. If you have a whole directory of files and you want to bring in all of them, you can use something like `import.meta.glob('path/to/*.svg')`.

This would generate a file with a bunch of dynamic imports that you could then use. 

A demonstration was then made of dynamically importing all of the images and adding it in.

After the demo, a change was made with options such as `{eager: true}` for forcing all the images to be brought in without dynamic imports. Unlikely you'll need to use it often, but you can use it.

## 6. Building Libraries

### 6.1 Library Mode

Vite is great for building libraries with support for outputting things like CJS and ESM.

For creating a library, there is a specific property designed for this called `build.lib`. It requires an `entry` path and then an output `name`. You can also define the formats you want to include here.

By default, this will also bundle external libraries unless you explicitly decide it not to. To do this, you will need to use the `rollupOptions.external` array to add what libraries you don't want to bundle in with the code.

An interesting gotcha that showed up in the video was that default exports didn't look to export the data that the default export was meaning to export. I'm not entirely sure what happened at that point since it brushed by it, by worth calling out in these notes.

### 6.2 Generating declaration files

In this section, he walked through a plugin that showed how to generate some declaration files using another plugin to help with that.

This might actually be important to note for some of the stuff I am currently facing with `tsup`, another library that helps for bundling. It might be worth checking out the library to see if that can help.

### 6.3 Injecting CSS

Another plugin showed was for injecting CSS. This demonstrated how to get the JS with the CSS actually added as part of it so that you can get those scoped styles that are expected.

### 6.4 Using the library

In order to use the library that supports both CJS and ESM, then you need to make some changes to `package.json`. 

There changes made were to add `main`, `module` and `exports` keys for the `package.json` files. Where do you need exports when the other two are added? Don't know.

Exports requires the types, require and import keywords.

### 6.5 Module federation

tl;dr allows you to load code from another remote server. For some people, this approach is terrifying.

There is a plugin that can be used for this.

The demonstration flips the script on installing the library that was created in the previous sections and instead demonstrates things when using the plugin.

For the host, the `remotes` section was added with `femds: "url:..."` added where the URL was the localhost browser.

So at this point, in the consuming application (which was using React) the we had to dynamically import the code from `import('femds/button')` and the used Suspense to load things behind it.

## 7.  Plugins

### 7.1 Virtual Modules

This topic is a little confusing, so best to read up about what they are here https://vite.dev/guide/api-plugin#virtual-modules-convention. 

From Claude:

*A virtual module in Vite is a module that doesn't exist as a physical file in your project's file system, but is instead generated on-the-fly by Vite or a plugin. These modules are created and served dynamically during development or build time.*

*Here's a simple explanation:*

*Virtual modules are like "imaginary" files that Vite creates and manages for you. They can contain code, data, or configuration that's generated based on your project's needs, without you having to manually create and maintain these files.*

*An analogy to help understand virtual modules:*

*Think of a virtual module like a hologram in a sci-fi movie. In the movie, characters can interact with the hologram as if it were a real, physical object, even though it doesn't actually exist in the physical world. Similarly, in Vite, your code can import and use virtual modules as if they were real files, even though they don't exist on your hard drive.*

*Some common use cases for virtual modules include:*

1. *Generating code based on project configuration*
2. *Creating aliases or shortcuts for commonly used imports*
3. *Injecting environment variables or global constants*
4. *Transforming or preprocessing certain types of files*

*Virtual modules allow Vite and its plugins to provide powerful features and optimizations without cluttering your project's file system with temporary or generated files.*

Here is an example of this in action that was used for the [dev](https://vite-workshop.vercel.app/plugins-virtual-modules) environment of this presentation.

### 7.2 Building a markdown plugin

In this section, `markdown-it` library was used to create a new markdown plugin that Vite could use.

The object used for implementing the plugin uses the `name`, `resolveId` and `load` object methods to demonstrate how everything works.
