import * as THREE from 'three';

import { AsciiEffect } from './AsciiEffect';
import { TrackballControls } from './TrackballControls';

let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: THREE.Renderer;
let shape: THREE.Mesh;

let controls: TrackballControls; // from TrackBallControls
let effect: AsciiEffect; // from AsciiEffect

const start = Date.now();
const fps = 60;

/** Initializes the scene for the shape and attaches it to the dom
 * @param domElement - the element to append to
 * @param color - the color of the shape
 */
export function init(domContainer: Element, color: string, domController: Element): void {
	camera = new THREE.PerspectiveCamera(35, (window.innerWidth) / window.innerHeight, 1, 2500);
	camera.position.y = 600;
	camera.position.z = 600;
	// camera.position.x = 60;

	scene = new THREE.Scene();
	// scene.background = new THREE.Color(0, 0, 0);
	// scene.background = null;
	// new THREE.Color( 0xff0000 )

	const pointLight1 = new THREE.PointLight(0xffffff);
	pointLight1.position.set(2000, 2000, 2000);
	scene.add(pointLight1);

	const pointLight2 = new THREE.PointLight(0xffffff, 0.25);
	pointLight2.position.set(- 2000, - 1000, - 1000);
	scene.add(pointLight2);

	shape = new THREE.Mesh(new THREE.IcosahedronGeometry(200), new THREE.MeshLambertMaterial());
	scene.add(shape);

	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize((window.innerWidth), window.innerHeight);

	// @ts-ignore: this is property *does* exist
	renderer.setClearAlpha(1.0);

	// effect = new AsciiEffect(renderer, ' .-:/+░ed#@▒▓', );
	effect = new AsciiEffect(renderer, '▓▒@#de░+/:-. ');
	// effect = new AsciiEffect(renderer, '@#de+/:-. ');
	effect.setSize((window.innerWidth), window.innerHeight);

	effect.domElement.style.color = color;

	// Special case: append effect.domElement, instead of renderer.domElement.
	// AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.

	domContainer.appendChild(effect.domElement);
	// DEBUG
	// document.body.appendChild(renderer.domElement);

	controls = new TrackballControls(camera, domController);
	controls.minDistance = 222;
	controls.maxDistance = 2000;
	controls.rotateSpeed = 9.0;
	window.addEventListener('resize', onWindowResize);

	animate();
}

function onWindowResize() {

	camera.aspect = (window.innerWidth) / window.innerHeight;
	// camera.aspect = 1;
	camera.updateProjectionMatrix();

	effect.setSize((window.innerWidth), window.innerHeight);
	renderer.setSize((window.innerWidth), window.innerHeight);

}



function animate(): void {


	//reduce framerate
	setTimeout(() => {

		requestAnimationFrame(animate);

		//must be called to enable rotating
		// controls.update();
		// renderer.render(scene, camera);
		render();


	}, 1000 / fps);

	// 

	// requestAnimationFrame(animate);
	// render();
}

function render() {




	const timer = Date.now() - start;

	shape.rotation.x = timer * 0.0001;
	shape.rotation.z = timer * 0.00005;


	controls.update();
	effect.render(scene, camera);

	// DEBUG
	// renderer.render(scene, camera);

}