// Loaded from index.html
const GUI = dat.GUI;
const PATTERNS = ['demo', 'omar'];

function loadPatterns(newPatternCallback) {
	const gui = new GUI({ width: 300 });
	const params = { pattern: PATTERNS[0] };
	gui.add(params, "pattern", PATTERNS).onChange(val => {
		newPatternCallback(val);
	});
}

export default loadPatterns;