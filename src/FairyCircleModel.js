// See:
// https://github.com/squaredproject/Entwined/blob/master/oldlx/Trees/FairyCircleModel.java
import * as THREE from "three";
import BaseCube from './BaseCube.js';

const FAIRY_TYPE = "FAIRY_CIRCLE";
const TO_RADIANS = Math.PI / 180;

class MiniCluster {
	RADIUS = 18;
	HEIGHTS = [
		12, 14, 14, 16,
		16, 18, 18, 20,
		20, 18, 18, 16,
		16, 14, 14, 12];
	N_CUBES = 12;
	cubes = [];

	constructor(miniClusterPosition, miniClusterRotation /*radians*/, fcc, sculptureIndex) {
		const { x, z } = fcc;
		const { N_CUBES, RADIUS, HEIGHTS, cubes } = this;

		let rads = miniClusterRotation;
		let rad_step = (360 / N_CUBES) * TO_RADIANS;

		for (let i = 0; i < N_CUBES; i++) {
			const cubePosition = new THREE.Vector3();

			cubePosition.x = RADIUS * Math.cos(rads);
			cubePosition.y = HEIGHTS[i];
			cubePosition.z = RADIUS * Math.sin(rads);
			rads += rad_step;

			const globalPosition = new THREE.Vector3(x, 0, z).add(miniClusterPosition).add(cubePosition);
			const localPosition = miniClusterPosition.clone().add(cubePosition);
			const newCube = new BaseCube(globalPosition, localPosition, sculptureIndex, FAIRY_TYPE, fcc.pieceId, fcc.cubeSizeIndex);
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

			const cluster = new MiniCluster(miniClusterPosition, miniClusterRotation, fcc, i);

			rads += rad_step;
			miniClusterRotation += rad_step;

			this.cubes.push(...cluster.cubes);
		}
	}
}

class FairyCircleModel {
	cubes = []
	constructor(fairyCircleConfig) {
		for (let fcc of fairyCircleConfig) {
			const fixture = new Fixture(fcc);
			this.cubes.push(...fixture.cubes);
		}
	}
}

export default FairyCircleModel;