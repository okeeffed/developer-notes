(window.webpackJsonp=window.webpackJsonp||[]).push([[273],{Imks:function(e,n,t){"use strict";t.r(n),t.d(n,"_frontmatter",(function(){return i})),t.d(n,"default",(function(){return c}));t("1c7q"),t("abGl"),t("gZHo"),t("Fdmb"),t("Ir+3"),t("2mQt"),t("mXGw");var a=t("/FXl"),l=t("TjRS");t("aD51");function r(){return(r=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e}).apply(this,arguments)}var i={};void 0!==i&&i&&i===Object(i)&&Object.isExtensible(i)&&!i.hasOwnProperty("__filemeta")&&Object.defineProperty(i,"__filemeta",{configurable:!0,value:{name:"_frontmatter",filename:"manual/Java/Dependency-Management-With-Gradle.md"}});var o={_frontmatter:i},d=l.a;function c(e){var n=e.components,t=function(e,n){if(null==e)return{};var t,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,["components"]);return Object(a.b)(d,r({},o,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"dependency-management-with-gradle"},"Dependency Management with Gradle"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",r({parentName:"li"},{href:"#dependency-management-with-gradle"}),"Dependency Management with Gradle"),Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",r({parentName:"li"},{href:"#gr-1-gradle-the-build-tool"}),"GR-1: Gradle the build tool"),Object(a.b)("ul",{parentName:"li"},Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",r({parentName:"li"},{href:"#-----gr-11-buildgradle"}),"---- GR-1.1: build.gradle")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",r({parentName:"li"},{href:"#-----gr-12-gradlew-and-gradlewbat"}),"---- GR-1.2: gradlew and gradlew.bat")))),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",r({parentName:"li"},{href:"#gr-2-adding-dependencies"}),"GR-2: Adding Dependencies")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",r({parentName:"li"},{href:"#gr-3-source-code"}),"GR-3: Source Code"))))),Object(a.b)("h2",{id:"gr-1-gradle-the-build-tool"},"GR-1: Gradle the build tool"),Object(a.b)("p",null,"There are a lot of tasks when you want to build your project."),Object(a.b)("p",null,"Other build tools include Maven and Ant, and Gradle works well with these two."),Object(a.b)("p",null,"Gradle exposes a Domain Specific Language (DSL) that is based heavily on the ",Object(a.b)("a",r({parentName:"p"},{href:"http://groovy-lang.org/"}),"Groovy Programming Language")," and is very similar to Groovy."),Object(a.b)("p",null,"Gradle has an opinionated way on how things should be done and laid out."),Object(a.b)("p",null,"If you want to use an IDE for this, the example uses ",Object(a.b)("inlineCode",{parentName:"p"},"IntelliJ")," and the Gradle template."),Object(a.b)("p",null,"From the main menu, select Gradle and select Java as the main language and create."),Object(a.b)("p",null,"From here, you will need to fill in:"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"GroupId"),": General com.dennis.app\n",Object(a.b)("inlineCode",{parentName:"p"},"ArtifactId"),": JAR file name eg. app"),Object(a.b)("p",null,"Ensure you select the Java version you want to use as well - demo was 1.8."),Object(a.b)("p",null,"One you are in the files have been downloaded by Gradle, open up the project structure and it'll end up creating a build script called ",Object(a.b)("inlineCode",{parentName:"p"},"build.gradle"),"."),Object(a.b)("h2",{id:"gr-11-buildgradle"},"GR-1.1: build.gradle"),Object(a.b)("p",null,"This is the main file that is defining things like the structure etc."),Object(a.b)("p",null,"For now, you may have this as an example"),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{}),"group 'com.dennisokeeffe.intro'\nversion '1.0-SNAPSHOT'\n\napply plugin: 'java'\n\nsourceCompatibility = 1.5\n\nrepositories {\n    mavenCentral()\n}\n\ndependencies {\n    testCompile group: 'junit', name: 'junit', version: '4.11'\n}\n")),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"apply")," is for things like folder structure etc. - you may notice that this is also the ",Object(a.b)("inlineCode",{parentName:"p"},"Groovy")," language."),Object(a.b)("h2",{id:"gr-12-gradlew-and-gradlewbat"},"GR-1.2: gradlew and gradlew.bat"),Object(a.b)("p",null,"These files are the Gradle wrappers that makes sure that everyone can build and test the project the same way."),Object(a.b)("hr",null),Object(a.b)("h2",{id:"gr-2-adding-dependencies"},"GR-2: Adding Dependencies"),Object(a.b)("p",null,"Transitive depencies are all handled through Gradle. This means it won't download version of dependencies it already has."),Object(a.b)("p",null,"Where does it download from? This is under control that is defined in the ",Object(a.b)("inlineCode",{parentName:"p"},"repositories")," section and by default uses ",Object(a.b)("inlineCode",{parentName:"p"},"Maven Central")," - you can also change this."),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{}),"// dependencies uses a helper function mavenCentral()\n// anything in dependencies will look in the repos\n\nrepositories {\n    mavenCentral()\n}\n\ndependencies {\n    testCompile group: 'junit', name: 'junit', version: '4.11'\n}\n")),Object(a.b)("p",null,"As an example, we can actually find packages that can be used as Maven depencies (XML) and add it such that Gradle can handle it. Eg Apache CSV package."),Object(a.b)("pre",null,Object(a.b)("code",r({parentName:"pre"},{}),"repositories {\n    mavenCentral()\n}\n\ndependencies {\n    compile group: ''org.apache.commons', name: 'commons-csv', version: '1.2'\n    testCompile group: 'junit', name: 'junit', version: '4.11'\n}\n")),Object(a.b)("p",null,"Now we want to refresh the project."),Object(a.b)("p",null,"In IntelliJ, you can find the Gradle tool bar on the lefthand edge and then click on it and select refresh to rebuild."),Object(a.b)("p",null,"Now, the library will show up in the External Libraries section. If you had the ",Object(a.b)("inlineCode",{parentName:"p"},"Auto import")," setting selected or you have right-clicked on the project name in the LH edge Gradle bar and selected ",Object(a.b)("inlineCode",{parentName:"p"},"Auto-import"),", it will automatically do this for you."),Object(a.b)("p",null,"There is also a shorter form for writing dependencies."),Object(a.b)("p",null,"compile 'org.apache.commons:commons-csv:1.2'"),Object(a.b)("p",null,"Transitive dependencies will also be downloaded automatically. If we want a better idea of what is going on, we can use the terminal."),Object(a.b)("p",null,"To do this, we can run ",Object(a.b)("inlineCode",{parentName:"p"},"./gradlew dependencies")),Object(a.b)("h2",{id:"gr-3-source-code"},"GR-3: Source Code"),Object(a.b)("p",null,"Now, anyone who has that ",Object(a.b)("inlineCode",{parentName:"p"},"gradle build")," file we have, we can just insert all those depencies that we need and then from any computer we can just build that!"),Object(a.b)("p",null,"Then we can import the packages that we need to the Java files and then use them as we expect."),Object(a.b)("p",null,"To find more packages, we can then go to something like Maven and search for packages."))}c&&c===Object(c)&&Object.isExtensible(c)&&!c.hasOwnProperty("__filemeta")&&Object.defineProperty(c,"__filemeta",{configurable:!0,value:{name:"MDXContent",filename:"manual/Java/Dependency-Management-With-Gradle.md"}}),c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---manual-java-dependency-management-with-gradle-md-de1e0abf0d6e979a1edc.js.map