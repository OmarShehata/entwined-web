class PatternBase {
	static hotReloadHandler(newModule) {
		const event = new CustomEvent('hot-module-reload', { detail: { newModule } });
		document.body.dispatchEvent(event);
	}

	constructor(cubes) {
		this.cubes = cubes;
		// For effects that want to access cubes in order
		this.cubesByIndex = [];
		// Also compute yMin, yMax, xMin, xMax
		this.yMin = cubes[0].y;
		this.yMax = cubes[0].y;
		this.xMax = cubes[0].x;
		this.xMin = cubes[0].x;
		for (let cube of cubes) {
			this.cubesByIndex[cube.index] = cube;

			if (cube.x > this.xMax) this.xMax = cube.x;
			if (cube.x < this.xMin) this.xMin = cube.x;
			if (cube.y > this.yMax) this.yMax = cube.y;
			if (cube.y < this.yMin) this.yMin = cube.y;
		}
	}
	
	toRadians(degrees) {
		return degrees * (Math.PI / 180);
	}
	hotReload(oldModule) {}
	run(deltaMs) {}
}

export default PatternBase;