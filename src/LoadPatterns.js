// Loaded from index.html
const GUI = dat.GUI;
const PATTERNS = ['twister', 'fairySnake', 'demo'];

function loadPatterns(newPatternCallback) {
	const gui = new GUI({ width: 300 });
	const params = { pattern: PATTERNS[0] };
	gui.add(params, "pattern", PATTERNS).onChange(val => {
		newPatternCallback(val);
	});

	newPatternCallback(PATTERNS[0]);

	gui.add({ 'About this project': () => {
		window.open('https://github.com/OmarShehata/entwined-web', '_blank')
	} }, 'About this project');
}

export default loadPatterns;