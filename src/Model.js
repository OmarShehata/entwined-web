// This reads in JSON files that describe the scene
// Then returns the location of all the cubes.
// See Model.java in the original project: 
// https://github.com/squaredproject/Entwined/blob/master/oldlx/Trees/Model.java
import ShrubModel from './ShrubModel.js';
import FairyCircleModel from './FairyCircleModel.js';
import TreeModel from './TreeModel.js';

async function loadFile(url) {
	const req = await fetch(url);
	const content = await req.json();
	return content;
}

class Model {
	loaded = false;
	cubes = [];

	constructor(fairyCircleFileURL, shrubFileURL, treeFileURL) {
		this.fairyCircleFileURL = fairyCircleFileURL;
		this.shrubFileURL = shrubFileURL;
		this.treeFileURL = treeFileURL;
	}

	async load() {
		if (this.loaded == false) {
			const fairyCircle = await loadFile(this.fairyCircleFileURL);
			let cubes = this.createFairyCircles(fairyCircle);
			this.cubes.push(...cubes);

			const shrubs = await loadFile(this.shrubFileURL);
			cubes = this.createShrubs(shrubs);
			this.cubes.push(...cubes);

			const trees = await loadFile(this.treeFileURL);
			cubes = this.createTrees(trees);
			this.cubes.push(...cubes);
		}

		return this.cubes;
	}
	
	createFairyCircles(fairyCircleConfig) {
		const fairyCircleModel = new FairyCircleModel(fairyCircleConfig);
		return fairyCircleModel.cubes;
	}

	createShrubs(shrubConfig) {
		const shrubModel = new ShrubModel(shrubConfig);
		return shrubModel.cubes;
	}

	createTrees(treeConfig) {
		const treeModel = new TreeModel(treeConfig);
		return treeModel.cubes;
	}
}

export default Model;