# Three

### 練習來源

* https://github.com/mrdoob/three.js

### 實作執行

* https://github.com/Shyam-Chen/Frontend-Starter-Kit

***

### 目錄

* 核心
  * 場景元件
* 著色
* 矩陣
* 材質
* 光源
* 幾何體
* 粒子
* 精靈
* WebVR

***

```js
import { PerspectiveCamera, Scene, BoxGeometry, MeshBasicMaterial, Mesh, WebGLRenderer } from 'three';

let camera, scene, renderer, geometry, material, mesh;

const init = () => {
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 1000;

  scene = new Scene();

  geometry = new BoxGeometry(200, 200, 200);
  material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true });

  mesh = new Mesh(geometry, material);
  scene.add(mesh);

  renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.querySelector('#ex')
    .appendChild(renderer.domElement);
};

const animate = () => {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  renderer.render(scene, camera);
};

init();
animate();
```

```html
<div id="ex"></div>
```
