# 1 - Introduction

## What is Three.js

`Three.js` is a 3D javascript library that enables devs to create 3d experiences on the web.

It works with WebGL, but can also work with SVG and CSS.

## Basic scene

In `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>03 - Basic Scene</title>
  </head>
  <body>
    <canvas class="webgl"></canvas>
    <script src="https://unpkg.com/three"></script>
    <script src="./script.js"></script>
  </body>
</html>
```

As for `script.js`:

```js
// Canvas
const canvas = document.querySelector("canvas.webgl")

// Sizes
const sizes = {
  width: 800,
  height: 600,
}

// Scene
const scene = new THREE.Scene()

// Object
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "#ff0000",
})
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cubeMesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
```

> Three.js documentation is great.

Ultimately we'll end up with a red cube that well be looking at straight-on.

## Transformations

There are 4 properties to transform objects:

1. `position`
2. `rotation`
3. `scale`
4. `quaternion`

These properties will be compiled in matrices.

### Rotation

`rotation` inherits from the `Euler` object which works in `Math.PI`. It will rotate around the provided axis in `X * Math.Pi`.

Axis order is also important for rotation.

### Quaternion

This is a representation of rotation that is more helpful.

### Creating groups

You can create a new group with `new THREE.Group()`.

From there, we can add multiple objects to a group.

## Animations

We need to call a function to animate the scene.

You can think of it as "stop motion".

```js
import "./style.css"
import * as THREE from "three"
import gsap from "gsap"

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

/**
 * Base
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Animate
 */
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

const tick = () => {
  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
```

There were also examples playing around using the THREE clock elapsed time with sinuisoidal waves.

If you want more control, the `GSAP` can help to create things such as tweens (a Greensock library).

## Cameras

- Camera: The `Camera` class is what we call an abstract class. You're not supposed to use it directly, but you can inherit from it to have access to common properties and methods. Some of the following classes inherit from the Camera class.
- ArrayCamera: The `ArrayCamera` is used to render your scene multiple times by using multiple cameras. Each camera will render a specific area of the canvas. You can imagine this looking like old school console multiplayer games where we had to share a split-screen.
- StereoCamera: The `StereoCamera` is used to render the scene through two cameras that mimic the eyes in order to create what we call a parallax effect that will lure your brain into thinking that there is depth. You must have the adequate equipment like a VR headset or red and blue glasses to see the result.
- CubeCamera: The `CubeCamera` is used to get a render facing each direction (forward, backward, leftward, rightward, upward, and downward) to create a render of the surrounding. You can use it to create an environment map for reflection or a shadow map. We'll talk about those later.
- OrthographicCamera: The `OrthographicCamera` is used to create orthographic renders of your scene without perspective. It's useful if you make an RTS game like Age of Empire. Elements will have the same size on the screen regardless of their distance from the camera.
- PerspectiveCamera: The `PerspectiveCamera` is the one we already used and simulated a real-life camera with perspective.

We are going to focus on the `OrthographicCamera` and the `PerspectiveCamera` in the course.

```js
// Camera
const camera = new THREE.PerspectiveCamera(
  75, // in degress for ield of view
  sizes.width / sizes.height,
  0.1, // near param
  100 // far param
)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)
camera.position.z = 3
scene.add(camera)
```

Be aware for near and far params ended up with `z fighting` bug when using the `PerspectiveCamera`.

When using the [`OrthographicCamera`](https://threejs.org/docs/#api/en/cameras/OrthographicCamera) camera you pass a `left`, `right`, `top`, `bottom`, `near`, and `far` param. Be sure to calculate the aspect ratio. It can be great for effects.

We can also add controls to move the camera:

```js
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// Cursor
const cursor = {
  x: 0,
  y: 0,
}

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = -(event.clientY / sizes.height - 0.5)
})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Animate
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update camera - this is the examble before using OrbitControl
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  // camera.position.y = cursor.y * 5

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
```

## Fullscreen and resizing

This lesson is to make things immersive and take up all available space.

We can change our sizes to be the following:

```js
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}
```

To handle the resize, we can listen to the resize event.

```js
const resizeCallback = () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
}
window.addEventListener("resize", resizeCallback)
// be sure to remove as well
```

To handle the blurry render or "stairs" effect, we can use the `antialias` param. This happens because we are on a screen with a pixel ratio greater than 1.

```js
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
```

Be sure to reduce the max to be `2`.

To handle fullscreen:

```js
// Fullscreen
const dblclickCallback = () => {
  if (document.fullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  } else {
    if (canvas.current.requestFullscreen) {
      canvas.current.requestFullscreen()
    } else if (canvas.current.webkitRequestFullscreen) {
      canvas.current.webkitRequestFullscreen()
    }
  }
}
window.addEventListener("dblclick", dblclickCallback)
```

## Geometries

Geometries are composed of vertices (coordinates in space).

Geometries can be used to create meshes but they can also be used to create particles (covered later).

We will use geometries to create triangles between vertices.

All geometries inherit from the `Geometry` class.

Common geometries:

- `BoxGeometry`
- `PlaneGeometry`
- `CircleGemoetry`
- `CylinderGeometry`
- `SphereGeometry`
- `ConeGeometry`
- `TorusGeometry`
- `RingGeometry`
- `TorusKnotGeometry`
- `DodecahedronGeometry`

There are many more. Check the [docs](https://threejs.org/docs/?q=Geometry#api/en/geometries/BoxGeometry).

If you want to see how many "triangles" are made on the surface of a geometry, you can pass `wireframe` to be `true` to the `MeshBasicMaterial`:

```js
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ wireframe: true })
```

### Creating your own triangle

```js
const positionsArray = new Float32Array(9)

positionsArray[0] = 0
positionsArray[1] = 0
positionsArray[2] = 0

positionsArray[3] = 0
positionsArray[4] = 1
positionsArray[5] = 0

positionsArray[6] = 1
positionsArray[7] = 0
positionsArray[8] = 0

// alternative, you could inline it as the argument.

// Convert it to a BufferAttribute
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

const geometry = new THREE.BufferGeometry()
geometry.setAttribute("position", positionsAttribute)
```

## Debug UI

The debug UI helps you to test things out live.

First we need to add the `npm` dependecy `dat.gui` with `npm install dat.gui`

```js
import * as dat from "dat.gui"
import gasp from "gasp"

const gui = new dat.GUI()

const parameters = {
  color: "#ff0000",
  spin: () => {
    gsap.to(mesh.rotation, { y: mesh.rotation.y + 10, duration: 1 })
  },
}

// Adding elements
gui.add(mesh.position, "y")
// gui.add(mesh.position, 'y', - 3, 3, 0.01) - this example specifies properties min, max and precision
// gui.add(mesh.position, 'y').min(- 3).max(3).step(0.01).name('elevation') - here is an alternative use of it

gui.add(mesh, "visible")
gui.add(material, "wireframe")
gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color)
})
```

There are different types of elements you can add to that panel:

1. Range — for numbers with minimum and maximum value
2. Color — for colors with various formats
3. Text — for simple texts
4. Checkbox — for booleans (true or false)
5. Select — for a choice from a list of values
6. Button — to trigger functions
7. Folder — to organize your panel if you have too many elements

As for other tips:

- You can press `h` to toggle the hide.
- You can close the panel by clicking the toggle.
- You can change the width by drag and drop or provide a default width (400 was the example).

## Textures

- Color (or albedo): The albedo texture is the most simple one. It'll only take the pixels of the texture and apply them to the geometry.
- Alpha: The alpha texture is a grayscale image where white will be visible, and black won't.
- Height (or displacement): The height texture is a grayscale image that will move the vertices to create some relief. You'll need to add subdivision if you want to see it.
- Normal: The normal texture will add small details. It won't move the vertices, but it will lure the light into thinking that the face is oriented differently. Normal textures are very useful to add details with good performance because you don't need to subdivide the geometry.
- Ambient occlusion: The ambient occlusion texture is a grayscale image that will fake shadow in the surface's crevices. While it's not physically accurate, it certainly helps to create contrast.
- Metalness: The metalness texture is a grayscale image that will specify which part is metallic (white) and non-metallic (black). This information will help to create reflection.
- Roughness: The roughness is a grayscale image that comes with metalness, and that will specify which part is rough (white) and which part is smooth (black). This information will help to dissipate the light. A carpet is very rugged, and you won't see the light reflection on it, while the water's surface is very smooth, and you can see the light reflecting on it. Here, the wood is uniform because there is a clear coat on it.

## PBR

Those textures (especially the metalness and the roughness) follow what we call PBR principles. PBR stands for Physically Based Rendering. It regroups many techniques that tend to follow real-life directions to get realistic results.

While there are many other techniques, PBR is becoming the standard for realistic renders, and many software, engines, and libraries are using it.

If you're curious, you can see the following:

1. https://marmoset.co/posts/basic-theory-of-physically-based-rendering/
2. https://marmoset.co/posts/physically-based-rendering-and-you-can-too/

## How to load textures

### With Native JavaScript

```js
const image = new Image()
const texture = new THREE.Texture(image)
image.addEventListener("load", () => {
  texture.needsUpdate = true
})
image.src = "/textures/door/color.jpg"

// To see the texture on the cube, replace the color property by map and use the texture as value
const material = new THREE.MeshBasicMaterial({ map: texture })
```

### Using TextureLoader

```js
const textureLoader = new THREE.TextureLoader()
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(
  "/textures/door/color.jpg",
  // loading finished callback
  () => {
    console.log("loading finished")
  },
  // loading in progress callback
  () => {
    console.log("loading progressing")
  },
  // loading image failed callback
  () => {
    console.log("loading error")
  }
)
```

### Using the LoadingManager

If you have multiple images to load and want to mutualize the events like being notified when all the images are loaded, you can use a LoadingManager.

```js
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
  console.log("loading started")
}
loadingManager.onLoad = () => {
  console.log("loading finished")
}
loadingManager.onProgress = () => {
  console.log("loading progressing")
}
loadingManager.onError = () => {
  console.log("loading error")
}

const textureLoader = new THREE.TextureLoader(loadingManager)

// Start loading what you need
const colorTexture = textureLoader.load("/textures/door/color.jpg")
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg")
const heightTexture = textureLoader.load("/textures/door/height.jpg")
const normalTexture = textureLoader.load("/textures/door/normal.jpg")
const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
)
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg")
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg")

// In use
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
```

## Transforming the texture

```js
const colorTexture = textureLoader.load("/textures/door/color.jpg")
colorTexture.repeat.x = 2
colorTexture.repeat.y = 3

// for x and y respectively to repeat the texture
colorTexture.wrapS = THREE.RepeatWrapping
colorTexture.wrapT = THREE.RepeatWrapping

// alternativing the direction
colorTexture.wrapS = THREE.MirroredRepeatWrapping
colorTexture.wrapT = THREE.MirroredRepeatWrapping

// offsetting the texture
colorTexture.offset.x = 0.5
colorTexture.offset.y = 0.5

// rotating the texture
colorTexture.rotation = Math.PI * 0.25

// changing the rotation from 0, 0 (assuming offset and repeat are removed)
colorTexture.rotation = Math.PI * 0.25
colorTexture.center.x = 0.5
colorTexture.center.y = 0.5
```

## Minification filter

The minification filter happens when the pixels of texture are smaller than the pixels of the render. In other words, the texture is too big for the surface, it covers.

You can change the minification filter of the texture using the minFilter property.

There are 6 possible values:

```js
THREE.NearestFilter
THREE.LinearFilter
THREE.NearestMipmapNearestFilter
THREE.NearestMipmapLinearFilter
THREE.LinearMipmapNearestFilter
THREE.LinearMipmapLinearFilter
```

The default is `THREE.LinearMipmapLinearFilter`. If you are not satisfied with how your texture looks, you should try the other filters.

> If use a texture like a small checkerboard, then the artefacts you see are are called `moiré` patterns and you usually want to avoid them.

## Magnification filter

The magnification filter works just like the minification filter, but when the pixels of the texture are bigger than the render's pixels. In other words, the texture too small for the surface it covers.

You can change the magnification filter of the texture using the `magFilter` property.

There are only two possible values:

```js
THREE.NearestFilter
THREE.LinearFilter
```

Only use the mipmaps for the `minFilter` property. If you are using the `THREE.NearestFilter`, you don't need the mipmaps, and you can deactivate them with `colorTexture.generateMipmaps = false`:

```js
colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
```

## Dealing with the size

Each pixel of the textures you are using will have to be stored on the GPU regardless of the image's weight. And like your hard drive, the GPU has storage limitations. It's even worse because the automatically generated mipmapping increases the number of pixels that have to be store.

Try to reduce the size of your images as much as possible.

If you remember what we said about the mipmapping, Three.js will produce a half smaller version of the texture repeatedly until it gets a 1x1 texture. Because of that, your texture width and height must be a power of 2. That is mandatory so that Three.js can divide the size of the texture by 2.

Some examples: `512x512`, `1024x1024` or `512x2048`

512, 1024 and 2048 can be divided by 2 until it reaches 1.

If you are using a texture with a width or height different than a power of 2 value, Three.js will try to stretch it to the closest power of 2 number, which can have visually poor results, and you'll also get a warning in the console.

## Where to find textures

Unfortunately, it's always hard to find the perfect textures. There are many websites, but the textures aren't always right, and you may have to pay.

It's probably a good idea to start by searching on the web. Here are some websites I frequently end up on.

- poliigon.com
- 3dtextures.me
- arroway-textures.ch

## Materials

Materials are used to put a color on each visible pixel of the geometries.

The algorithms that decide on the color of each pixel are written in programs called shaders. Writing shaders is one of the most challenging parts of WebGL and Three.js, but don't worry; Three.js has many built-in materials with pre-made shaders.

This section will just focus on materials for now.

### Preparing the scene

```js
/**
 * Objects
 */
const material = new THREE.MeshBasicMaterial()

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material)
sphere.position.x = -1.5

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

/**
 * Animate to spin the objects slowly
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime
  plane.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = 0.15 * elapsedTime
  plane.rotation.x = 0.15 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime

  // ...
}

tick()
```

To load the texture onto the objects, we load them and then create the `material` variable:

```js
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load("/textures/door/color.jpg")
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg")
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
)
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg")
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg")
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg")
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg")
const matcapTexture = textureLoader.load("/textures/matcaps/1.png")
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg")

const material = new THREE.MeshBasicMaterial({ map: doorColorTexture })
```

The color property on the material will apply a unifor color. This can be combined with the `map` property of the texture:

```js
// Ways to apply the color
material.color = new THREE.Color("#ff0000")
material.color = new THREE.Color("#f00")
material.color = new THREE.Color("red")
material.color = new THREE.Color("rgb(255, 0, 0)")
material.color = new THREE.Color(0xff0000)
```

We can use the `wireframe` property to show the triangles that compose the geometry with `material.wireframe = true`.

There are some other properties explained:

```js
// opacity
material.transparent = true
material.opacity = 0.5

// texture transparency
material.alphaMap = doorAlphaTexture

// `side` property lets you decide which side of a face is visible (by default is front side)
material.side = THREE.DoubleSide
```

### MeshNormalMaterial

```js
// The MeshNormalMaterial displays a nice purple, blueish, greenish color
// You can use Normals for many things like calculating how to illuminate the face or how the environment should reflect or refract on the geometries' surface.
const material = new THREE.MeshNormalMaterial()

// new property we can use - normals won't be interpolated between the vertices
material.flatShading = true
```

### MeshMatcapMaterial

MeshMatcapMaterial is a fantastic material because of how great it can look while being very performant.

```js
const material = new THREE.MeshMatcapMaterial()
material.matcap = matcapTexture
```

The meshes will appear illuminated, but it's just a texture that looks like it.

The only problem is that the illusion is the same regardless of the camera orientation. Also, you cannot update the lights because there are none.

### MeshDepthMaterial

The MeshDepthMaterial will simply color the geometry in white if it's close to the camera's near value and in black if it's close to the far value of the camera.

### Materials that need lighting

The following need lights to be scene.

```js
/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
```

Those materials are:

- `MeshLambertMaterial`
- `MeshPhongMaterial`
- `MeshStandardMaterial`
- `MeshToonMaterial`

## The `ao` property

The `aoMap` property (literally "ambient occlusion map") will add shadows where the texture is dark. For it to work, you must add what we call a second set of UV (the coordinates that help position the textures on the geometries).

```js
sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
)
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
)

material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 1
```

## 3D Text

Three.js already supports 3D text geometries with the `TextGeometry` class. The problem is that you must specify a font, and this font must be in a particular json format called typeface.

> You can use a font converter like [this](https://gero3.github.io/facetype.js/).

```js
/**
 * Fonts
 */
const fontLoader = new THREE.FontLoader()

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new THREE.TextGeometry("Hello Three.js", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  })
  const textMaterial = new THREE.MeshBasicMaterial()
  const text = new THREE.Mesh(textGeometry, textMaterial)
  scene.add(text)
})
```

### Center the text

```js
// Computer the bounding box
textGeometry.computeBoundingBox()

// We can now center it like so (also subtracting bevel or 0.02 to be precise)
textGeometry.translate(
  -(textGeometry.boundingBox.max.x - 0.02) * 0.5, // Subtract bevel size
  -(textGeometry.boundingBox.max.y - 0.02) * 0.5, // Subtract bevel size
  -(textGeometry.boundingBox.max.z - 0.03) * 0.5 // Subtract bevel thickness
)

// Or just do it without being ridiculous
textGeometry.center()
```

### Adding textures

```js
const matcapTexture = textureLoader.load("/textures/matcaps/1.png")

const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
```

### Adding shapes around the text

```js
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)

const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

// ...

const text = new THREE.Mesh(textGeometry, material)

for (let i = 0; i < 100; i++) {
  const donut = new THREE.Mesh(donutGeometry, donutMaterial)

  donut.position.x = (Math.random() - 0.5) * 10
  donut.position.y = (Math.random() - 0.5) * 10
  donut.position.z = (Math.random() - 0.5) * 10

  donut.rotation.x = Math.random() * Math.PI
  donut.rotation.y = Math.random() * Math.PI

  const scale = Math.random()
  donut.scale.set(scale, scale, scale)

  scene.add(donut)
}
```
