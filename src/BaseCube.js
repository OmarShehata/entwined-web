import * as THREE from "three";
import { SCALE } from './Scale.js';

// See:
// https://github.com/squaredproject/Entwined/blob/master/oldlx/Trees/Cube.java
class BaseCube extends THREE.Mesh {
	constructor(position = new THREE.Vector3(), cubeSizeIndex = 0) {
		const CUBE_SIZES = [5 * SCALE, 5 * SCALE, 9 * SCALE];
		const size = CUBE_SIZES[cubeSizeIndex];
		const geometry = new THREE.BoxGeometry( size, size, size );
  		const material = new THREE.MeshStandardMaterial( {color: 0x000000} );
		super(geometry, material)

		this.position.set(position.x, position.y, position.z);
	}	

	setHSB(hue, saturation, brightness) {
		// Hue will be a float between 0-360, saturation 0-100, and brightness 0-100
		hue = hue / 360
		saturation = saturation / 100
		brightness = brightness / 100
		this.material.color.setHSL(hue, saturation, brightness);
	}
}

export default BaseCube;