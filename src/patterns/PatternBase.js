class PatternBase {
	static hotReloadHandler(newModule) {
		const event = new CustomEvent('hot-module-reload', { detail: { newModule } });
		document.body.dispatchEvent(event);
	}

	constructor(cubes) {
		this.cubes = cubes;
	}
	hotReload(oldModule) {}
	run(deltaMs) {}
}

export default PatternBase;