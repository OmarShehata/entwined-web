import PatternBase from './PatternBase.js';

class Demo extends PatternBase {
	constructor(cubes) {
		super(cubes)

		this.count = 0;
	}

	// Will run every time a hot reload occurs
	// Use this to copy over any state variables to the new instance
	hotReload(oldModule) {
		this.count = oldModule.count;
	}

	// Runs every frame
	run(deltaMs) {
		
		// const cube = this.cubesByIndex[this.count]
		// cube.setHSB(0, 50, cube.getBrightness() > 0 ? 0 : 50);
		// this.count += 1;
		// if (this.count >= this.cubesByIndex.length) {
		// 	this.count = 0;
		// }

		// for (let cube of this.cubes) {
		// 	const hue = Math.sin(this.count * 0.001) * 360 * 0.5 + 360 * 0.5;
		// 	const saturation = 50.0;
		// 	const brightness = 50.0;
		// 	// Set hue (0-360), saturation (0-100), brightness (0-100)
		// 	cube.setHSB(hue, saturation, brightness);
		// }
	}
}

if (import.meta.hot) {
  import.meta.hot.accept(PatternBase.hotReloadHandler)
}

export default Demo;