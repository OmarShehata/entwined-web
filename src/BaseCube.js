import * as THREE from "three";

const TO_DEGREES = 180 / Math.PI;
let cubeCount = 0;

// See:
// https://github.com/squaredproject/Entwined/blob/master/oldlx/Trees/Cube.java
class BaseCube extends THREE.Mesh {
	constructor(globalPosition, sculpturePosition, sculptureIndex, pieceType, pieceId, cubeSizeIndex=0) {
		const CUBE_SIZES = [5 , 5 , 9 ];
		const size = CUBE_SIZES[cubeSizeIndex];
		const geometry = new THREE.BoxGeometry( size, size, size );
  		const material = new THREE.MeshStandardMaterial( {color: 0x000000} );
		super(geometry, material)

		this.position.set(globalPosition.x, globalPosition.y, globalPosition.z);

		// Global index count of cubes 
		this.index = cubeCount++;
		// Global position
		this.x = globalPosition.x;
		this.y = globalPosition.y;
		this.z = globalPosition.z;

		// Position relative to sculpture
		this.sx = sculpturePosition.x;
		this.sy = sculpturePosition.y;
		this.sz = sculpturePosition.z;

		// Radial distance from sculpture center to field center (0, 0) in x-z plane
		const sculptureCenter = new THREE.Vector2(sculpturePosition.x, sculpturePosition.z);
		this.r = sculptureCenter.distanceTo(new THREE.Vector2());

		// Angle in degrees from cube center to center of tree in x-z plane
		this.theta = 180 + TO_DEGREES * Math.atan2(sculpturePosition.z, sculpturePosition.x);

		// Global radial distance from cube center to center of the field (0, 0) also the center of main tree. x-z plane
		const cubeCenter = new THREE.Vector2(this.x, this.z);
		this.gr = cubeCenter.distanceTo(new THREE.Vector2());

		// Global angle in degrees from cube center to center of the field (0, 0) also the center of main tree. x-z plane
		this.globalTheta = TO_DEGREES * Math.atan2(0 - this.z, 0 - this.x);

		//  String for the ID of the piece, such as "medium tree" or whatever
		this.pieceId = pieceId;

		// String stating what kind of Piece this is a part of: TREE, SHRUB, FAIRY_CIRCLE
		this.pieceType = pieceType

		// Index indicating which sculpture this cube lives inside.
		// These are only unique per pieceType.
		this.sculptureIndex = sculptureIndex;
	}	

	setHSB(hue, saturation, brightness) {
		// Hue will be a float between 0-360, saturation 0-100, and brightness 0-100
		hue = hue / 360
		saturation = saturation / 100
		brightness = brightness / 100

		// Note: settings brightness to 100% makes it white, which
		// isn't the behavior in the original entwined
		// so I'm capping brightness at 50 here
		this.material.color.setHSL(hue, saturation, brightness * 0.5);
	}

	getHue() {
		return this.material.color.getHSL({}).h * 360;
	}
	getSaturation() {
		return this.material.color.getHSL({}).s * 100;
	}
	getBrightness() {
		return this.material.color.getHSL({}).l * 100 * 2;
	}
}

export default BaseCube;