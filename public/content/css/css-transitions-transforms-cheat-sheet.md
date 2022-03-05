---
name: Css Transitions Transforms Cheat Sheet
menu: CSS 
---
# CSS Transitions and Transforms Cheat Sheet

```css
/* =================================
  Photo Overlay Transition
==================================== */

.photo-overlay {
	opacity: 0;
	transition-property: opacity;
	transition-duration: .5s;
}
.photo-overlay:hover {
	opacity: 1;
}

/* =================================
  Button Transitions
==================================== */

.button {
	opacity: 0;
	transition-property: opacity, background, box-shadow;
	transition-duration: .5s;
	transition-delay: .2s, .3s, 0s;
}

.button:hover {
	background: rgba(74, 137, 202, 1);
	box-shadow: 0 0 0 3px rgba(255, 255, 255, .7);
}

.photo-overlay:hover .button {
	opacity: 1;
}

.btn-icon {
	transition-property: opacity, left;
	transition-duration: .5s;
	transition-delay: .3s;
	transition-timing-function: ease-in-out, ease-out;
}

.button:hover .btn-icon {
	opacity: 1;
	left: 80%;
}

// The transition CSS property is a shorthand property for transition-property, transition-duration, transition-timing-function, and transition-delay.
// Multiple properties can be written in this shorthand with a comma in between.

/* =================================
  		  Code Challenges
==================================== */

/* nav-item transitions ---------- */

.nav-item {
	flex-grow: 1;
  transition-property: flex-grow;
  transition-duration: .5s;
  transition-timing-function: ease-out;
}

.nav-item:hover {
	flex-grow: 2;
}

/* nav icon transitions ---------- */

.icon {
  right: -25px;
  transition: right .4s ease-in-out 300ms;
}

.nav-item:hover .icon {
	right: 12%;
}

/* =================================
  Image Transforms & Transitions
==================================== */

/* -- Row 1 --------- */

img {
	transition: transform .5s;
}

img:hover {
	transform: rotate(-5deg) scale(1.1);
}

/* -- Row 2 --------- */

.photo img {
	transform-origin: 0 0;
}

.photo:hover img {
	transform: scale(1.2);
}

/* -- Row 3 --------- */

.slide .photo-overlay,
.slide img {
	transition: transform .6s ease-out;
}

.slide .photo-overlay {
	transform: translateX(-100%);
}

.slide:hover .photo-overlay {
	transform: translateX(0);
}

.slide:hover img {
	transform: translateX(100%);
}

/* -- Logo ---------- */

.logo:hover {
	transform: rotate(-20deg);
}
```

### Photo 3D Transforms & Transitions

```html
/* =================================
  Photo 3D Transforms & Transitions
==================================== */

<!DOCTYPE html>
<html>
<head>
	<title>3D Transform Gallery</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="css/main.css">
	<link rel="stylesheet" href="css/interactions.css">
</head>
<body>
	<div class="container">
		<header class="main-header clearfix">
			<img class="logo" src="img/camera.svg">
			<h1 class="name">3DTransform <span>Gallery</span></h1>
		</header>

		<div class="content clearfix">

			<div class="cube-container">
				<div class="photo-cube">

					<img class="front"src="img/photos/1.jpg" alt="">
					<div class="back photo-desc">
					  <h3>Earth from Space</h3>
					  <p>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
						<a href="#" class="button">download</a>
					</div>
					<img class="left" src="img/photos/2.jpg" alt="">
					<img class="right" src="img/photos/3.jpg" alt="">

				</div>
			</div>

			<div class="cube-container">
				<div class="photo-cube">

					<img class="front"src="img/photos/4.jpg" alt="">
					<div class="back photo-desc">
					  <h3>Space Images</h3>
					  <p>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
						<a href="#" class="button">download</a>
					</div>
					<img class="left" src="img/photos/5.jpg" alt="">
					<img class="right" src="img/photos/6.jpg" alt="">

				</div>
			</div>

			<div class="cube-container">
				<div class="photo-cube">

					<img class="front"src="img/photos/7.jpg" alt="">
					<div class="back photo-desc">
					  <h3>The Milky Way</h3>
					  <p>Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
						<a href="#" class="button">download</a>
					</div>
					<img class="left" src="img/photos/8.jpg" alt="">
					<img class="right" src="img/photos/9.jpg" alt="">

				</div>
			</div>

		</div>
	</div>
</body>
</html>
```
```css
.cube-container {
	box-shadow: 0 18px 40px 5px rgba(0,0,0,.4);
	perspective: 800px;
}

.photo-cube {
	transition: transform 2s ease-in-out;
	width: 220px;
	height: 200px;
	transform-style: preserve-3d;
}

.photo-cube:hover {
	transform: rotateY(-270deg);
}

.front,
.back,
.left,
.right {
	width: 100%;
	height: 100%;
	display: block;
	position: absolute;
}

.front {
	transform: translateZ(110px);
}

.back {
	transform: translateZ(-110px) rotateY(270deg);
	transform-origin: center left;
}

.left {
	transform: rotateY(-270deg) translateX(110px);
	transform-origin: top right;
}

.right {
	transform: translateZ(-110px) rotateY(180deg);
}

/* Complete the challenge by writing CSS below */

.wrapper {
  perspective: 600px;
}

.photo {
  transform: rotate3d(0,1,0,30deg);
}
```
```javascript
/* =================================
  Load JavaScript after Transition
==================================== */

map.$elem.toggleClass('-active').one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
	if (!map.map) {
		map.initMap();
	}
});
```
