---
name: Gulp Basics TH
menu: Java Script 
---
GULP BASICS

/////////////////////////////////////////////////////////

PART 1: WELCOME TO GULP.JS

/****************************
*							*
	    1. Why Gulp
*							*
****************************/

JS Task Runner - Automation!

Thinks like compiling SASS and CoffeeScript to JS.

Gulp the engine to run this. Can be just about anything!

Tasks generally set in the JS files
- run one after the other eg. concat then run it!
- can run things in parallel

/****************************
*	 						*
	  2. Gulp in Action
*	  						*
****************************/

How you work as important on what you work on.

A project with a bunch of tasks already defined.

In the dev workflow
- gulpfile.js -> what gulp looks for
- gulp serve //to run dev server

Automatically compiles and reloads when code adjusted!

gulp //command on its own
- runs another gulp task as defined
- known as the default task
- puts everything in a folder known as dist

QUESTIONS

1. When you run gulp on its own, gulp invokes the _____ task

A: Default

/****************************
*	 						*
	3. Installing Gulp
*	  						*
****************************/

Gulp is node.js tech.

which node
which npm 
etc.

//run npm init
- this initiales the folder as a npm package etc

Gulp only ever needed for development, which is why it is a dev dependency.

/****************************
*	 						*
	 4. First Gulp Task
*	  						*
****************************/

Create a gulpfile.js //or whatever really

'use strict';

var gulp = require('gulp');

gulp.task("hello", function() { //first param, adds the task name!
	console.log("Hello!");
});

//to set up the default task

gulp.task("default", ["hello"], function() {
	console.log("This is the default task");
}); //will run every dependency in the array before itself

/****************************
*	 						*
	 5. Use 3rd party
	 	gulp plugins
*	  						*
****************************/

- you can get plugins for gulp!
	+ built outside of the gulp team

PLUGINS

Gulp Concat
- concat all js into one file

npm install gulpconcat --save-dev

for your index scripts, we can just have one js file... app.js!

//in gulpfile.js

'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task("concatScripts", function() { //first param, adds the task name!
	gulp.src([ //take array of file names or single file
	'js/jquery.js', 
	'js/sticky.jquery.sticky.js', 
	'js/main.js']) 
});

//to set up the default task

gulp.task("default", ["hello"], function() {
	console.log("This is the default task");
}); //will run every dependency in the array before itself

Benefits of using the src as a readable stream

/****************************
*	 						*
	  6. Minifying JS
	 	  scripts
*	  						*
****************************/

- minify for performance benefits

Gulp Uglify -> minify 

npm install gulp-uglify --save-dev

'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task("concatScripts", function() { //first param, adds the task name!
	gulp.src([ //take array of file names or single file
	'js/jquery.js', 
	'js/sticky.jquery.sticky.js', 
	'js/main.js'])
	.pipe(concat("app.js"))
	.pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", function() {
	gulp.src("js/app.js")
		.pipe(uglify())
		.pipe(gulp.dest("js"));
});

//to set up the default task

gulp.task("default", ["concatScripts", "minifyScripts"], function() {
	console.log("This is the default task");
}); //will run every dependency in the array before itself

BUT WE WANT TO KEEP BOTH FILES

So we can use gulp-rename

npm install gulp-rename --save-dev

/////////////////////////////////////////////////////////

PART 3: COMPILE SASS WITH GULP

/****************************
*	 						*
	  7. Turn Sass into
	  CSS, automatically
*	  						*
****************************/

One challenge with Sass is that it needs to be compiled
- it is time consuming

INSTALL GULP-SASS

npm install gulp-sass --save-dev

Easier to have gulp use one scss source.

//gulpfile

'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

gulp.task("concatScripts", function() { //first param, adds the task name!
	gulp.src([ //take array of file names or single file
	'js/jquery.js', 
	'js/sticky.jquery.sticky.js', 
	'js/main.js'])
	.pipe(concat("app.js"))
	.pipe(gulp.dest("js"));
});

guld.task("minifyScripts", function() {
	gulp.src("js/app.js")
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest("js"));
});

gulp.task('compileSass', function(){
	gulp.src("scss/application.scss")
		.pipe(sass())
		.pipe(gulp.dest('css'));
});

//to set up the default task

gulp.task("default", ["concatScripts", "minifyScripts"], function() {
	console.log("This is the default task");
}); //will run every dependency in the array before itself

/****************************
*	 						*
	  8. Add Source Maps
	    to your SaSS
*	  						*
****************************/

Downsides for compiling from a bunch to just one file.
- only comes from compile css file
- need to figure out which sass file for changes

The answer? Source maps.

How? Gulp source maps module.

npm install gulp-sourcemaps --save-dev

'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');

gulp.task("concatScripts", function() { //first param, adds the task name!
	gulp.src([ //take array of file names or single file
	'js/jquery.js', 
	'js/sticky.jquery.sticky.js', 
	'js/main.js'])
	.pipe(concat("app.js"))
	.pipe(gulp.dest("js"));
});

guld.task("minifyScripts", function() {
	gulp.src("js/app.js")
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest("js"));
});

gulp.task('compileSass', function(){
	gulp.src("scss/appication.scss")
		.pipe(maps.init())
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest('css'));
});

//to set up the default task

gulp.task("default", ["concatScripts", "minifyScripts"], function() {
	console.log("This is the default task");
}); //will run every dependency in the array before itself

/****************************
*	 						*
	  8. SourceMaps for
	  		JS too
*	  						*
****************************/

'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');

gulp.task("concatScripts", function() { //first param, adds the task name!
	gulp.src([ //take array of file names or single file
	'js/jquery.js', 
	'js/sticky.jquery.sticky.js', 
	'js/main.js'])
	.pipe(maps.init())
	.pipe(concat("app.js"))
	.pipe(maps.write('./')) //or ../maps
	.pipe(gulp.dest("js"));
});

guld.task("minifyScripts", function() {
	gulp.src("js/app.js")
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest("js"));
});

gulp.task('compileSass', function(){
	gulp.src("scss/appication.scss")
		.pipe(maps.init())
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest('css'));
});

//to set up the default task

gulp.task("default", ["concatScripts", "minifyScripts"], function() {
	console.log("This is the default task");
}); //will run every dependency in the array before itself

/////////////////////////////////////////////////////////

PART 4: IMPROVING YOUR GULP TASK PIPELINES

/****************************
*	 						*
	 9. Putting Multiple
	   Tasks Together
*	  						*
****************************/

This video is about the build task

Every build tasks are currently in parallel

Set the return and make depencies as the second argument for gulp.task

'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');

gulp.task("concatScripts", function() { //first param, adds the task name!
	return gulp.src([ //take array of file names or single file
	'js/jquery.js', 
	'js/sticky.jquery.sticky.js', 
	'js/main.js'])
	.pipe(maps.init())
	.pipe(concat("app.js"))
	.pipe(maps.write('./')) //or ../maps
	.pipe(gulp.dest("js"));
});

guld.task("minifyScripts", ["concatScripts"], function() {
	return gulp.src("js/app.js")
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest("js"));
});

gulp.task('compileSass', function(){
	return gulp.src("scss/appication.scss")
		.pipe(maps.init())
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest('css'));
});

gulp.task("build", ["minifyScripts", "compileSass"]);

//to set up the default task

gulp.task("default", ["build"], function() {
	console.log("This is the default task");
}); //will run every dependency in the array before itself

/****************************
*	 						*
	10. Auto Run Tasks
  with Gulp's watch method
*	  						*
****************************/

Amazing thing to work for us!

Use a globbing pattern to save writing an array.

gulp.task('watchSass', function() {
	gulp.watch(['sccs/application.sccs',...]) //don't need to use return

	OR 

	gulp.watch(['sccs/**/*.scss'], ['compileSass']); //globbing file
});

/****************************
*	 						*
	 11. The build and 
	development timeline
*	  						*
****************************/

So far, been using it to work with our frontend.

How to manage the deployment?
- this course: the build

The Build Pipeline
- just need to compile our pipeline...

in the build task:

gulp.task("build", ["minifyScripts", "compileSass"], function() {
	return gulp.src(["css/application.css", "js/app.min.js", "index.html", "img/**", "fonts/**"], { base: './' })
		.pipe(gulp.dest('dist'));
});

The clean process

- one example is if file names have changed
- install node module del -> deletes according to glob

npm install del --save-dev

var del = require('del');

gulp.task("clean", function() {
	del(['dist','css/application.css*','js/app*.js*']);
});

gulp.task("default", ["clean"], function() {
	gulp.start('build'); //going to change in gulp 4 gulp.series
});

/****************************
*	 						*
	12. Dev Pipeline in
			Depth
*	  						*
****************************/

Dev Task pipeline for this app.

gulp.task('watchFiles', function() {
	gulp.watch(['sccs/**/*.scss'], ['compileSass']); 
	gulp.watch(["js/main.js"], ["concatScripts"]);

	//could also do this... but waste of time
	gulp.watch(['sccs/**/*.scss', "js/main.js"], ['compileSass', "concatScripts"]); 
});

gulp.task("serve", ["watchFiles"]);


/****************************
*	 						*
	13. Where to go from
			here?
*	  						*
****************************/

Refer back to see the link to the GitHub file for the advanced folder









