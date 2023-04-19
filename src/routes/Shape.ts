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

const x_speed = 0.0001;
const y_speed = 0.00005;

/** Initializes the scene for the shape and attaches it to the dom
 * @param domElement - the element to append to
 * @param color - the color of the shape
 */
export function init(domContainer: Element, color: string, domController: Element) {

	camera = new THREE.PerspectiveCamera(36, (document.querySelector("html").getBoundingClientRect().width) / window.innerHeight, 1, 2500);
	camera.position.y = 600;
	camera.position.z = 600;

	scene = new THREE.Scene();


	const pointLight1 = new THREE.PointLight(0xffffff);
	pointLight1.position.set(2000, 2000, 2000);
	scene.add(pointLight1);

	const pointLight2 = new THREE.PointLight(0xffffff, 0.25);
	pointLight2.position.set(- 2000, - 1000, - 1000);
	scene.add(pointLight2);

	shape = new THREE.Mesh(new THREE.IcosahedronGeometry(200), new THREE.MeshLambertMaterial());
	scene.add(shape);

	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize((document.querySelector("html").getBoundingClientRect().width), window.innerHeight);

	// @ts-ignore: this property *does* exist
	renderer.setClearAlpha(1.0);

	effect = new AsciiEffect(renderer, '▓▒@#de░+/:-. ');
	effect.setSize((document.querySelector("html").getBoundingClientRect().width), window.innerHeight);

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

	render();
	animate();

	return {shape}
}

function onWindowResize() {

	console.log("still here!")

	camera.aspect = (document.querySelector("html").getBoundingClientRect().width) / window.innerHeight;
	// camera.aspect = 1;
	camera.updateProjectionMatrix();

	effect.setSize((document.querySelector("html").getBoundingClientRect().width), window.innerHeight);
	renderer.setSize((document.querySelector("html").getBoundingClientRect().width), window.innerHeight);

}



function animate(): void {
	setTimeout(() => {

		requestAnimationFrame(animate);
		render();

	}, 1000 / fps);
}

function render() {




	const timer = Date.now() - start;

	shape.rotation.x = timer * x_speed;
	shape.rotation.z = timer * y_speed;


	controls.update();
	effect.render(scene, camera);

	// DEBUG
	// renderer.render(scene, camera);

}

// function toggle_motion(): void {
// 	if (x_speed === 0.0001) {
// 		x_speed = 0;
// 		y_speed = 0;
// 	} else {
// 		x_speed = 0.0001;
// 		y_speed = 0.00005;
// 	}
// }