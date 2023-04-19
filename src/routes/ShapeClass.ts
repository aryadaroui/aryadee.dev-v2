import * as THREE from 'three';

import { AsciiEffect } from './AsciiEffect';
import { TrackballControls } from './TrackballControls';

export class Shape {
	camera: THREE.PerspectiveCamera;
	scene: THREE.Scene;
	renderer: THREE.Renderer;
	pointLight1: THREE.PointLight;
	pointLight2: THREE.PointLight;
	shape: THREE.Mesh;
	controls: TrackballControls; // from TrackBallControls
	effect: AsciiEffect; // from AsciiEffect

	start: number;
	fps: number;

	x_speed: number;
	y_speed: number;

	boundOnWindowResize: () => void;
	boundTimeOut: number;

	constructor(domContainer: Element, color: string, domController: Element) {

		this.start = Date.now();
		this.fps = 60;

		this.x_speed = 0.0001;
		this.y_speed = 0.00005;

		const width = document.querySelector("html").getBoundingClientRect().width;

		this.camera = new THREE.PerspectiveCamera(36, width / window.innerHeight, 1, 2500);
		this.camera.position.y = 600;
		this.camera.position.z = 600;

		this.scene = new THREE.Scene();


		this.pointLight1 = new THREE.PointLight(0xffffff);
		this.pointLight1.position.set(2000, 2000, 2000);
		this.scene.add(this.pointLight1);

		this.pointLight2 = new THREE.PointLight(0xffffff, 0.25);
		this.pointLight2.position.set(- 2000, - 1000, - 1000);
		this.scene.add(this.pointLight2);

		this.shape = new THREE.Mesh(new THREE.IcosahedronGeometry(200), new THREE.MeshLambertMaterial());
		this.scene.add(this.shape);

		this.renderer = new THREE.WebGLRenderer({ alpha: true });
		this.renderer.setSize(width, window.innerHeight);

		// @ts-ignore: this property *does* exist
		this.renderer.setClearAlpha(1.0);

		this.effect = new AsciiEffect(this.renderer, '▓▒@#de░+/:-. ');
		this.effect.setSize(width, window.innerHeight);

		this.effect.domElement.style.color = color;

		// Special case: append effect.domElement, instead of renderer.domElement.
		// AsciiEffect creates a custom domElement (a div container) where the ASCII elements are placed.

		domContainer.appendChild(this.effect.domElement);
		// DEBUG
		// document.body.appendChild(renderer.domElement);

		this.controls = new TrackballControls(this.camera, domController);
		this.controls.minDistance = 222;
		this.controls.maxDistance = 2000;
		this.controls.rotateSpeed = 9.0;

		this.boundOnWindowResize = this.onWindowResize.bind(this);
		window.addEventListener('resize', this.boundOnWindowResize);

		// this.boundTimeOut = this.animate.bind(this);
		this.render();
		this.animate();
	}


	onWindowResize() {

		const width = document.querySelector("html").getBoundingClientRect().width;

		console.log("still here!");
		this.camera.aspect = width / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.effect.setSize(width, window.innerHeight);
		this.renderer.setSize(width, window.innerHeight);

	}

	animate() {
		this.boundTimeOut = setTimeout(() => {

			requestAnimationFrame(this.animate.bind(this));
			this.render();

		}, 1000 / this.fps);
	}

	render() {
		const timer = Date.now() - this.start;

		this.shape.rotation.x = timer * this.x_speed;
		this.shape.rotation.z = timer * this.y_speed;
		this.controls.update();
		this.effect.render(this.scene, this.camera);

		// DEBUG
		// renderer.render(scene, camera);
	}

	destroy() {
		clearTimeout(this.boundTimeOut); // clear frame timer
		this.fps = 0.001; // set fps to a very low value to stop rendering just in case
		window.removeEventListener('resize', this.boundOnWindowResize);

		this.shape.geometry.dispose();
		this.shape.material.dispose();
		this.scene.remove(this.shape);

		this.pointLight1.dispose();
		this.scene.remove(this.pointLight1);

		this.pointLight2.dispose();
		this.scene.remove(this.pointLight2);

		this.controls.dispose();
		this.renderer.dispose();

		// this is probably overkill
		this.shape = null;
		this.pointLight1 = null;
		this.pointLight2 = null;
		this.controls = null;
		this.renderer = null;
		this.camera = null;
		this.scene = null;
		this.effect = null;
	}

}


