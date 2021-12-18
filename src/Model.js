// This reads in JSON files that describe the scene
// Then returns the location of all the cubes.
// See Model.java in the original project: 
// https://github.com/squaredproject/Entwined/blob/master/oldlx/Trees/Model.java
import * as THREE from "three";
import BaseCube from './BaseCube.js';
import { SCALE } from './Scale.js';

const TO_RADIANS = Math.PI / 180;

async function loadFile(url) {
	const req = await fetch(url);
	const content = await req.json();
	return content;
}

class MiniCluster {
	RADIUS = 18 * SCALE;
	HEIGHTS = [
		12, 14, 14, 16,
		16, 18, 18, 20,
		20, 18, 18, 16,
		16, 14, 14, 12].map(v => v * SCALE);
	N_CUBES = 12;
	cubes = [];

	constructor(position, rotation /*radians*/, fcc) {
		const { x, z } = fcc;
		const { N_CUBES, RADIUS, HEIGHTS, cubes } = this;

		let rads = rotation;
		let rad_step = (360 / N_CUBES) * TO_RADIANS;

		for (let i = 0; i < N_CUBES; i++) {
			const cubePosition = new THREE.Vector3();

			cubePosition.x = RADIUS * Math.cos(rads);
			cubePosition.y = HEIGHTS[i];
			cubePosition.z = RADIUS * Math.sin(rads);
			rads += rad_step;

			const globalPosition = new THREE.Vector3(x, 0, z).add(position).add(cubePosition);
			const newCube = new BaseCube(globalPosition, fcc.cubeSizeIndex);
			cubes.push(newCube);
		}
	}
}

class Fixture {
	MINICLUSTERS_PER_NDB = 5;
	cubes = [];

	constructor(fcc /*fairyCircleConfig*/) {
		const N_MINICLUSTERS = fcc.ipAddresses.length * this.MINICLUSTERS_PER_NDB;

		const rad_step = (360 / N_MINICLUSTERS) * TO_RADIANS;
		let rads = fcc.ry * TO_RADIANS;
		let miniClusterRotation = Math.PI; 

		for (let i = 0; i < N_MINICLUSTERS; i++) {
			const miniClusterPosition = new THREE.Vector3();

			miniClusterPosition.x = fcc.radius * Math.cos(rads);
			miniClusterPosition.y = 0;
			miniClusterPosition.z = fcc.radius * Math.sin(rads);

			const cluster = new MiniCluster(miniClusterPosition, miniClusterRotation, fcc);

			rads += rad_step;
			miniClusterRotation += rad_step;

			this.cubes.push(...cluster.cubes);
		}
	}
}

class Model {
	loaded = false;
	cubes = [];

	constructor(fairyCircleFileURL, shrubFileURL, treeFileURL) {
		this.fairyCircleFileURL = fairyCircleFileURL;
		this.shrubFileURL = shrubFileURL;
		this.treeFileURL = treeFileURL;
	}

	async load() {
		if (this.loaded == false) {
			const fairyCircle = await loadFile(this.fairyCircleFileURL);
			let cubes = this.createFairyCircle(fairyCircle);
			this.cubes.push(...cubes);
		}

		return this.cubes;
	}

	// See:
	// https://github.com/squaredproject/Entwined/blob/master/oldlx/Trees/FairyCircleModel.java
	createFairyCircle(fairyCircleConfig) {
		const cubes = [];
		for (let fcc of fairyCircleConfig) {
			const fixture = new Fixture(fcc);
			cubes.push(...fixture.cubes);
		}
		return cubes;
	}
}

export default Model;