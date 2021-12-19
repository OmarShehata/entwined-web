import PatternBase from './PatternBase.js';

class Omar extends PatternBase {
	constructor(cubes) {
		super(cubes)
	}

	// Runs every frame
	run(deltaMs) {
		for (let cube of this.cubes) {
			const hue = 0;
			const saturation = 50.0;
			const brightness = 50.0;
			cube.setHSB(hue, saturation, brightness);
		}
	}
}

if (import.meta.hot) {
  import.meta.hot.accept(PatternBase.hotReloadHandler)
}

export default Omar;