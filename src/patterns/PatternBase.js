class PatternBase {
	static hotReloadHandler(newModule) {
		const event = new CustomEvent('hot-module-reload', { detail: { newModule } });
		document.body.dispatchEvent(event);
	}

	constructor(cubes) {
		this.cubes = cubes;
		// For effects that want to access cubes in order
		this.cubesByIndex = [];
		for (let cube of cubes) {
			this.cubesByIndex[cube.index] = cube;
		}
	}
	
	hotReload(oldModule) {}
	run(deltaMs) {}
}

export default PatternBase;