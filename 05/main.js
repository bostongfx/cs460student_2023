import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { AnaglyphEffect } from "three/addons/effects/AnaglyphEffect.js";
//import * as dat from 'dat.gui';
/*
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera (
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
*/
let renderer, scene, camera;
let effect;
init();
animate();

function loadFungus() {
const loader = new GLTFLoader();

loader.load('poly.glb', (gltf) => {
    var model = gltf.scene;
    model.scale.set(10,10,10);
    scene.add(model);
});

loader.load('fungus.glb', (gltf) => {
    var model1 = gltf.scene;
    model1.scale.set(0.1,0.1,0.1);
    model1.position.set(1,1,0.2);
    scene.add(model1);
});
}


// initialization
function init() {
    //renderer
const renderer = new THREE.WebGLRenderer();
// set size of renderer
renderer.setSize(window.innerWidth, window.innerHeight);
// add to container div
container.appendChild(renderer.domElement);
// effect setup
effect = new AnaglyphEffect( renderer );
effect.setSize(window.innerWidth, window.innerHeight);
// create scene
scene = new THREE.Scene();
// add in camera
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
//camera.position.z = 120;
camera.position.set(0,0,5)
// add in controls
const controls = new OrbitControls (camera, renderer.domElement);
controls.minDistance = 50;
controls.maxDistance = 200;
// add in light
const ambientLight = new THREE.AmbientLight (0x666666)
scene.add(ambientLight);


loadFungus();
// create GUI

const gui = new dat.GUI();
const sceneui = gui.addFolder('Scene');
// add x y z controls for lighting
    sceneui.add(ambientLight.position, 'x', -100, 100).name('Light X');
    sceneui.add(ambientLight.position, 'y', -100, 100).name('Light Y');
    sceneui.add(ambientLight.position, 'z', -100, 100).name('Light Z');


window['SCENE'] = {
    'anaglyph' : false
}
sceneui.add(window.SCENE, 'anaglyph');

}
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  if (window.SCENE.anaglyph) {
    effect.render(scene, camera);
  }
/*
  // other stuff...
  if (window.SCENE.poly) {
    if (window.SCENE.rotate_poly) {
      // TODO .. setup 180 degree quaternion
      window.SCENE.poly.quaternion.slerp(q, 0.01);
    } else {
      // TODO reset quaternion to identity!
      window.SCENE.poly.quaternion.slerp(q, 0.01);
    }
  }
  */
  // other stuff..
}
/* window.onload = function () {
    animate();
}
*/