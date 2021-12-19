import PatternBase from './PatternBase.js';

class Demo extends PatternBase {
	constructor(cubes) {
		// See all properties in the cube in BaseCube.js
		super(cubes)

		this.count = 0;
	}

	// (Optional)
	// Will run every time a hot reload occurs
	// Use this to copy over any state variables to the new instance
	hotReload(oldModule) {
		this.count = oldModule.count;
	}

	// Runs every frame
	run(deltaMs) {
		///////// There are 2 ways to loop over cubes
		///////// (1) This will loop through all the cubes and vary the hue of them based on their angle in the scene
		for (let cube of this.cubes) {
			const angle = this.toRadians(cube.globalTheta);
			const hue = Math.sin(angle + this.count * 0.05) * 360 * 0.5 + 360 * 0.5;
			const saturation = 50.0;
			const brightness = 100.0;
			// Set hue (0-360), saturation (0-100), brightness (0-100)
			cube.setHSB(hue, saturation, brightness);
		}
		this.count += 1;

		
		/////// (2) This will loop through cubes and turn them on one at a time in order of their creation
		// const cube = this.cubesByIndex[this.count]
		// cube.setHSB(0, 50, cube.getBrightness() > 0 ? 0 : 50);
		// this.count += 1;
		// if (this.count >= this.cubesByIndex.length) {
		// 	this.count = 0;
		// }
	}
}

if (import.meta.hot) {
  import.meta.hot.accept(PatternBase.hotReloadHandler)
}

export default Demo;