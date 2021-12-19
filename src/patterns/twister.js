// Ported over from Twister class here:
// https://github.com/squaredproject/Entwined/blob/master/oldlx/Trees/Patterns.java
import PatternBase from './PatternBase.js';

class Twister extends PatternBase {
	constructor(cubes) {
		super(cubes)

		this.spin = 0;
		this.hueCounter = 0;

		this.spinSpeed = 0;
		this.spinSpeedCounter = 0;
	}

	// Runs every frame
	run(deltaMs) {
		this.spinSpeedCounter += 0.01;
		this.spinSpeed = Math.sin(this.spinSpeedCounter) * 7;

		this.spin += this.spinSpeed;
		this.hueCounter += 2;

		for (let cube of this.cubes) {
			const wrapdist = Math.abs(cube.theta - this.spin) % 360;
			const yn = cube.y / this.yMax;
			const width = 10 + 30 * yn;
			const df = Math.max(0, 100 - (100 / 45) * Math.max(0, wrapdist - width));

			const hue = (this.hueCounter + cube.y * 0.2 - 360 - wrapdist) % 360;
			const saturation = Math.max(0, 100 - 500 * Math.max(0, yn - 0.8));
			const brightness = df;

			cube.setHSB(hue, saturation, brightness);
		}

	}
}

if (import.meta.hot) {
  import.meta.hot.accept(PatternBase.hotReloadHandler)
}

export default Twister;