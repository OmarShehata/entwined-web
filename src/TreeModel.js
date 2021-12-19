// See Tree class in:
// https://github.com/squaredproject/Entwined/blob/master/oldlx/Trees/Model.java
import * as THREE from "three";
import BaseCube from './BaseCube.js';

/*

A tree is made of branches & layers. 

Each layer is a circle of N branches, where N depends on which layer it's at (1st, 2nd or 3rd).
You get less branches the higher up you go. 
*/

const TREE_TYPE = "TREE";
const NUM_KEYPOINTS = 5;
const TO_RADIANS = Math.PI / 180;

function rotateY(vec3, angle) {
	vec3.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
	return vec3;
}

class EntwinedBranch {
	cubes = []
	xKeyPoints = new Array(NUM_KEYPOINTS);
	yKeyPoints = new Array(NUM_KEYPOINTS);
	zKeyPoints = new Array(NUM_KEYPOINTS);
	holeSpacing = 8;

	// This creates a single branch consisting of ~18 cubes
	constructor(canopyMajorLength, rotationalPosition, layerBaseHeight, config, sculptureIndex) {
		const rotationIndex = rotationalPosition > 4 ? ( 4 - rotationalPosition % 4 ) : rotationalPosition;
		const canopyScaling = canopyMajorLength / 180;
		const branchLengthRatios = [0.37, 0.41, 0.50, 0.56, 0.63];
		const heightAdjustmentFactors = [1.0, 0.96, 0.92, 0.88, 0.85];

		const { xKeyPoints, yKeyPoints, zKeyPoints, holeSpacing } = this;

		const branchLength = canopyMajorLength * branchLengthRatios[rotationIndex];
		xKeyPoints[4] = branchLength;
        xKeyPoints[3] = branchLength * 0.917;
        xKeyPoints[2] = branchLength * 0.623;
        xKeyPoints[1] = branchLength * 0.315;
        xKeyPoints[0] = canopyScaling * 12;
        yKeyPoints[4] = 72 * heightAdjustmentFactors[rotationIndex];
        yKeyPoints[3] = 72 * 0.914 * heightAdjustmentFactors[rotationIndex];
        yKeyPoints[2] = 72 * 0.793 * heightAdjustmentFactors[rotationIndex];
        yKeyPoints[1] = (72 * 0.671 + 6) * heightAdjustmentFactors[rotationIndex];
        yKeyPoints[0] = (72 * 0.455 + 8) * heightAdjustmentFactors[rotationIndex];
        zKeyPoints[4] = branchLength * 0.199;
        zKeyPoints[3] = branchLength * 0.13;
        zKeyPoints[2] = 0;
        zKeyPoints[1] = branchLength * (-0.08);
        zKeyPoints[0] = branchLength * (-0.05);

        const angle = rotationalPosition * 45 * TO_RADIANS + config.ry * TO_RADIANS;
        let newX = xKeyPoints[NUM_KEYPOINTS - 1];
        while (newX > 0) {
        	let keyPointIndex = 0;
            while (xKeyPoints[keyPointIndex] < newX && keyPointIndex < NUM_KEYPOINTS) {
                keyPointIndex++;
            }

            if (keyPointIndex < NUM_KEYPOINTS && keyPointIndex > 0) {
                const ratio = (newX - xKeyPoints[keyPointIndex - 1]) / (xKeyPoints[keyPointIndex] - xKeyPoints[keyPointIndex - 1]);
                const newY = yKeyPoints[keyPointIndex - 1] + ratio * (yKeyPoints[keyPointIndex] - yKeyPoints[keyPointIndex - 1])
                        + layerBaseHeight;
                const newZ = zKeyPoints[keyPointIndex - 1] + ratio * (zKeyPoints[keyPointIndex] - zKeyPoints[keyPointIndex - 1]);

                //////// This is my best attempt at matching the "inactive cubes" behavior in the original
                // I seem to be correctly generating the positions here, but not all of them become
                // active cubes. Not sure what controls this, but in my version below I just add
                // some arbitrary distance from the center to ignore cubes under that.
                let ignoreCube = false;
                const dist = new THREE.Vector3(newX, 0, newZ).distanceTo(new THREE.Vector3()); 
                if (dist <= branchLength * 0.5) {
                	ignoreCube = true;
                }

                const localPosition = new THREE.Vector3(newX, newY, newZ);
                rotateY(localPosition, angle);
                const globalPosition = new THREE.Vector3(config.x, 0, config.z).add(localPosition);

                if (!ignoreCube) {
                	const cube1 = new BaseCube(
	                	globalPosition, localPosition, sculptureIndex, 
	                	TREE_TYPE, config.pieceId, config.cubeSizeIndex);
	          
	                const localPosition2 = new THREE.Vector3(newX, newY, -newZ);
	                rotateY(localPosition2, angle);
	                const globalPosition2 = new THREE.Vector3(config.x, 0, config.z).add(localPosition2);
	                const cube2 = new BaseCube(
	                	globalPosition2, localPosition2, sculptureIndex, 
	                	TREE_TYPE, config.pieceId, config.cubeSizeIndex);

	                this.cubes.push(cube1);
	                this.cubes.push(cube2);
                }
                
            }
            newX -= holeSpacing;

        }
	}
}

class EntwinedLayer {
	cubes = []
	// Creates branches all around the center of the tree
	constructor(canopyMajorLength, layerType, layerBaseHeight, config, sculptureIndex) {
		let rotationalPositions = [];

		switch (layerType) {
			case 0:
				rotationalPositions = [0, 1, 2, 3, 4, 5, 6, 7];
				break;
			case 1:
				rotationalPositions = [0, 2, 4, 6];
				break;
			case 2:
				rotationalPositions = [1, 3, 5, 7];
				break;
			default:
				rotationalPositions = [];
		}

		for (let i = 0; i < rotationalPositions.length; i++) {
			const branch = new EntwinedBranch(
				canopyMajorLength, rotationalPositions[i], 
				layerBaseHeight, config, sculptureIndex);
			this.cubes.push(...branch.cubes);
		}
	}
}

class Fixture {
	cubes = []
	constructor(config, sculptureIndex) {
		const { canopyMajorLengths, layerBaseHeights } = config;

		for (let i = 0; i < canopyMajorLengths.length; i++) {
			const layer = new EntwinedLayer(canopyMajorLengths[i], i, layerBaseHeights[i], config, sculptureIndex);
			this.cubes.push(...layer.cubes);
		} 
	}
}

class TreeModel {
	cubes = []
	constructor(treeConfigs) {
		let sculptureIndex = 0;
		for (let config of treeConfigs) {
			const fixture = new Fixture(config, sculptureIndex);
			this.cubes.push(...fixture.cubes);
		}
	}
}

export default TreeModel;