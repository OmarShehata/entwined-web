// I wasn't able to port the full logic for creating this structure from Java. 
// I did my best to recreate it here from scratch.
// See https://github.com/squaredproject/Entwined/blob/master/oldlx/Trees/ShrubModel.java
import * as THREE from "three";
import BaseCube from './BaseCube.js';

/*
A Shrub is made of 12 clusters & 1 mounting point cube at the center.

Each cluster is 5 rods. 

Each rod is 1 cube.
*/

const SHRUB_TYPE = "SHRUB";
const NUM_CLUSTERS_IN_SHRUB = 12;

class Rod {
	cubes = []
	constructor(config, rodIndex, sculpturePosition, clusterIndex, angle) {
		// This creates 1 cube in the air
		const stepSize = 7;
		const initialOffset = 30;

		const randX = Math.random() * 6;
		const randY = Math.random() * 6;

		const offsetX = Math.cos(angle) * ((rodIndex + 5) * stepSize) + randX;
		const offsetZ = Math.sin(angle) * ((rodIndex + 5) * stepSize) + randY;
		const offsetY = rodIndex * stepSize * 1.3 + initialOffset;

		const localPosition = new THREE.Vector3(offsetX, offsetY, offsetZ);
		const globalPosition = sculpturePosition.clone().add(localPosition);
		const newCube = new BaseCube(globalPosition, localPosition, 0, SHRUB_TYPE, config.pieceId, config.cubeSizeIndex);
		this.cubes.push(newCube);
	}
}

class ShrubCluster {
	cubes = []
	constructor(config, clusterIndex, sculpturePosition) {
		// This creates 5 rods. Basically one arm of the shrub
		const angle = ((Math.PI * 2) / NUM_CLUSTERS_IN_SHRUB) * clusterIndex;
		for (let i = 0; i < 5; i++) {
			const rod = new Rod(config, i, sculpturePosition, clusterIndex, angle);
			this.cubes.push(...rod.cubes);
		}
		
	}
}

class ShrubFixture {
	cubes = []

	constructor(config) {
		// use config.ry to set initial angle? 
		const sculpturePosition = new THREE.Vector3(config.x, 0, config.z);

		for (let i = 0; i < NUM_CLUSTERS_IN_SHRUB; i++) {
			const cluster = new ShrubCluster(config, i, sculpturePosition);
			this.cubes.push(...cluster.cubes);
		}

		// Create the mounting point cube
		const localPosition = new THREE.Vector3();
		const globalPosition = sculpturePosition;
		const newCube = new BaseCube(globalPosition, localPosition, 0, SHRUB_TYPE, config.pieceId, config.cubeSizeIndex);
		this.cubes.push(newCube);
	}
}

class ShrubModel {
	cubes = []

	constructor(shrubConfigs) {
		for (let config of shrubConfigs) {
			const fixture = new ShrubFixture(config);
			this.cubes.push(...fixture.cubes);
		}
		
	}
}

export default ShrubModel;