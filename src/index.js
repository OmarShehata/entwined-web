import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import BaseCube from './BaseCube.js';
import Model from './Model.js';
import entwinedFairyCirclesUrl from '../static/entwinedFairyCircles.json?url'
import entwinedShrubsUrl from '../static/entwinedShrubs.json?url'
import entwinedTreesUrl from '../static/entwinedTrees.json?url'
//import demoPattern from './patterns/demo.js';
import loadPatterns from './LoadPatterns.js';


init();

async function init() {
  ////////// Camera, light & scene setup
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(200 , 200 , -500 );
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("canvas"),
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor( 0x454545, 1);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(light);
  light.position.set(1.7, 1, -1);

  const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add( ambientLight );

  // Create a plane that marks the location 0,0 
  const planeGeometry = new THREE.PlaneGeometry( 350 , 350  );
  const planeMaterial = new THREE.MeshBasicMaterial( {color: 0x222222, side: THREE.DoubleSide} );
  const plane = new THREE.Mesh( planeGeometry, planeMaterial );
  plane.position.set((-350 / 2) , 0, (350 / 2) );
  plane.rotateX(Math.PI / 2);
  scene.add( plane );

  ////////// Load the cube locations
  const model = new Model(entwinedFairyCirclesUrl, entwinedShrubsUrl, entwinedTreesUrl);
  const cubes = await model.load();
  for (let cube of cubes) {
    scene.add(cube);
  }

  ///// Load the patterns & GUI
  let patternModule = await import('./patterns/demo.js');
  let patternInstance = new patternModule.default(cubes);

  loadPatterns(async (newPattern) => {
    patternModule = await import(`./patterns/${newPattern}.js`);
    patternInstance = new patternModule.default(cubes);
  });

  ////////// Orbit camera controls.
  let controls = new OrbitControls(camera, renderer.domElement);
  // Center controls on the cubes' combined center
  let centerPos = new THREE.Vector3();
  for (let cube of cubes) {
    centerPos.x += cube.position.x; 
    centerPos.y += cube.position.y; 
    centerPos.z += cube.position.z; 
  }

  centerPos.x /= cubes.length;
  centerPos.y /= cubes.length;
  centerPos.z /= cubes.length;
  controls.target = centerPos;
  controls.update();

  ////////// Render loop
  let deltaTime = 0;
  let lastTimestamp = 0;
  function update(timestamp) {
    requestAnimationFrame(update);

    deltaTime = (timestamp - lastTimestamp);
    lastTimestamp = timestamp;
    patternInstance.run(deltaTime);

    renderer.render(scene, camera);
  }
  requestAnimationFrame(update);

  // Listen for hot module reload of patterns
  document.body.addEventListener('hot-module-reload', (event) => {
    const { newModule } = event.detail;
    // If the module that changed is not the one currently active, ignore it
    if (patternModule.default.name != newModule.default.name) {
      return;
    }
    const newPatternInstance = new newModule.default(cubes);
    newPatternInstance.hotReload(patternInstance)
    patternInstance = newPatternInstance;

    patternModule = newModule;
  });

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener("resize", onWindowResize, false);
}