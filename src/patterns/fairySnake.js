import PatternBase from './PatternBase.js';

/*

There's a couple parameters that can tweak this pattern:

* snakeFadeInSin's period, as well as how long it lingers on the min/max values.
  This controls how long it takes to go from one snake to 6-8 snakes, then back to 1.
* snakeLength is how many cubes each snake takes up as it moves
* speedParam <----- this one actually has a GUI param exposed
  This controls how fast the snakes move
* snakeConfigs/numSnakesPerCircle
  These are defined at the bottom of the constructor. These define the individual snake's params
  such as the direction, color, etc
  And how many snakes each fairy circle has
*/

class SnakeConfig {
	constructor(hue, offset, direction, alternate) {
		this.hue = hue;
		this.offset = offset;
		this.direction = direction;
		this.alternate = alternate;
	}
}

function wrapNegativeIndex(index, arrayLen) {
	if (index >= 0) return index;

	const numTimes = Math.ceil(Math.abs(index) / arrayLen);
	return index + numTimes * arrayLen;
}

class FairySnake extends PatternBase {
  /* For every fairy circle, construct two "snake paths". 
	  A regular one and an alternate one.
	  
	  These paths are made by taking half of one small circle,
	  followed by the opposite half of the next circle, and so on.
	  The alternate path is the same but moves along all the halves
	  that were not picked in the regular path.

	  These paths are stored in a map indexed by the pieceId of the fairy circle.
	 */
	constructor(cubes, model) {
		super(cubes, model)

		// Class variables
		this.snakePaths = {};
		this.snakePathsAlternate = {};
		this.snakeLength = 10;
		this.counter = 0;
		this.snakeConfigs = [];
		this.numSnakesPerCircle = {};
		this.speedParam = 3;
		this.snakeFadeInSin = 0;
		this.lfoCounter = 0;

		const outerPaths = {};
		const innerPaths = {};

		// These offsets are to make sure the halves we pick correctly align to
    // the outer/inner halves of the mini clusters.
    // These were obtained through trial & error.
    const RotationOffsets = {
    	"circle-1": -1,
    	"circle-2": 1,
    	"circle-3": -2
    }

    const lengthOfSnakePiece = 5;// How many cubes does a snake span inside a mini cluster
		
		for (let fc of model.fairyCircles) {
			const newInnerPath = [];
			const newOuterPath = [];

			let rotationOffset = RotationOffsets[fc.pieceId];
			if (rotationOffset == undefined) rotationOffset = 0;

			
			function getOuterAndInnerPaths(cluster) {
				// In each mini cluster, grab roughly half of it as a snake piece

				// inner path 
        for (let i = -lengthOfSnakePiece/2; i <= lengthOfSnakePiece/2; i++) {
          const size = cluster.cubes.length;
          const index = Math.round(i + size) % size;
          const newIndex = wrapNegativeIndex(index - rotationOffset, size) % size; 
          newInnerPath.push(cluster.cubes[newIndex]);
        }

        // outer path
        for (let i = lengthOfSnakePiece/2; i >= -lengthOfSnakePiece/2; i--) {
          const size = cluster.cubes.length;
          const index = Math.round(i + size + 6) % size;
          const newIndex = wrapNegativeIndex(index - rotationOffset, size) % size; 
          newOuterPath.push(cluster.cubes[newIndex]);
        }
			}

			// Need to run through these in reverse for all but circle-3
			// not sure why
			if (fc.pieceId == 'circle-3') {
				for (let cluster of fc.miniClusters) {
					getOuterAndInnerPaths(cluster);
				}
			} else {
				for (let i = fc.miniClusters.length - 1; i >= 0; i--) {
					const cluster = fc.miniClusters[i];
					getOuterAndInnerPaths(cluster);
				}
			}
			

			innerPaths[fc.pieceId] = newInnerPath;
			outerPaths[fc.pieceId] = newOuterPath;
		} 

		// Fill the final path with a sequence of alternating inner/outer paths
		for (let [key, value] of Object.entries(outerPaths)) {
			const finalPath = [];
			const finalPathAlt = [];

			const pieceId = key;

			const outerPath = value;
			const innerPath = innerPaths[pieceId];

			for (let j = 0; j < outerPath.length; j++) {
				// We switch from inner to outer when index is greater than lengthOfSnakePiece
        const index = j % (12);// This 12 is supposed to just be snakeLength, which is 10. But that doesn't work. Not sure why
        if (index <= lengthOfSnakePiece) {
          // The alternating path always takes the opposite half
          finalPath.push(outerPath[j]);
          finalPathAlt.push(innerPath[j]);
        } else {
         	finalPath.push(innerPath[j]);
          finalPathAlt.push(outerPath[j]);
        }
			}

			this.snakePaths[key] = finalPath;
			this.snakePathsAlternate[pieceId] = finalPathAlt;
		}

		// Create a config that tells us for each snake what is hue,
    // offset, direction etc is going to be. We then add these snakes 
    // to each circle. We'll add more snakes to bigger circle
    // hue, offset, direction, alternate
    const { snakeConfigs, numSnakesPerCircle } = this;
    snakeConfigs.push(new SnakeConfig(0, 0, 1, false));
    snakeConfigs.push(new SnakeConfig(50, 20, 1, false));
    snakeConfigs.push(new SnakeConfig(100, 0, -1, true));
    snakeConfigs.push(new SnakeConfig(200, 20, -1, true));
    snakeConfigs.push(new SnakeConfig(300, 40, 1, false));
    snakeConfigs.push(new SnakeConfig(350, 70, 1, true));
    snakeConfigs.push(new SnakeConfig(0, 40, -1, true));
    snakeConfigs.push(new SnakeConfig(150, 60, -1, true));
    snakeConfigs.push(new SnakeConfig(170, 85, 1, true));
    snakeConfigs.push(new SnakeConfig(70, 100, 1, false));

    numSnakesPerCircle["circle-1"] = 6;
    numSnakesPerCircle["circle-2"] = 6;
    numSnakesPerCircle["circle-3"] = 10;//this is the big one
	}

	updateSineLFO(deltaMs) {
		const min = 0;
		const max = 0.9;
		const periodMs = 1000 * 30;
		this.lfoCounter += deltaMs;

		this.snakeFadeInSin = (Math.sin(
			(this.lfoCounter / periodMs) * (Math.PI * 2)
			) * 0.5 + 0.5) * (max - min) + min;
	}

  // `offset` is the index it starts at. Used to have multiple snakes going around
  // at different points.
  // `fadeFactor` is 0-1, used to make the snakes fade in
  // `direction` is either clockwise (1) or anticlockwise (-1)
  // `alternate` uses the other path that uses the opposite halves
	makeSnake(pieceId, hue, offset, fadeFactor, direction, alternate) {
		let path = this.snakePaths[pieceId];

		if (alternate) {
			path = this.snakePathsAlternate[pieceId];
		}

		for (let i = 0; i < this.snakeLength; i++) {
			let index = Math.round(i + this.counter + offset) % path.length;
			let factorNormalized = (i / this.snakeLength);// from 1 to 0 along the snake

			if (direction == -1) {
				// Snake moving in reverse direction
				index = 
				wrapNegativeIndex(
					Math.round(i - this.counter + offset) % path.length,
					path.length
				)

				factorNormalized = 1 - (i / this.snakeLength);
			}

			const brightness = factorNormalized * 100 * fadeFactor;
      const saturation = factorNormalized * 100 * fadeFactor;

      const cube = path[index];
      if (cube.getBrightness() <= brightness) {
      	cube.setHSB(hue, saturation, brightness);
      }
		}
	}

	run(deltaMs) {
		// This counter drives the snakes moving along their paths
    this.counter += deltaMs * 0.005 * this.speedParam;	
	   
	  this.updateSineLFO(deltaMs);

    // Reset all fairy circle cubes to black
    for (let fc of this.model.fairyCircles) {
      for (let cluster of fc.miniClusters) {
        for (let i = 0; i < cluster.cubes.length; i++) {
        	cluster.cubes[i].setHSB(0, 0, 0);
        }
      }
    }

    // Example of making just two snakes, in one circle, run alternating paths
    // this.makeSnake("circle-1", 0, 0, 1, 1, false);
    // this.makeSnake("circle-2", 100, 60, 1, -1, true);

    // Apply the snakes for each circle. Fade in the number of snakes over time
    // they also fade out and repeat this cycle
    for (let [key, value] of Object.entries(this.numSnakesPerCircle)) {
    	const num = value;
    	const pieceId = key;
    	let fadeFactor = this.snakeFadeInSin * num;

    	if (fadeFactor <= 0) fadeFactor = 0;

    	for (let i = 0; i < num; i++) {
    		const config = this.snakeConfigs[i];
    		let localFadeFactor = fadeFactor - i + 1;
    		if (localFadeFactor <= 0) localFadeFactor = 0;
        if (localFadeFactor >= 1) localFadeFactor = 1;
        
        this.makeSnake(pieceId, config.hue, config.offset, localFadeFactor, config.direction, config.alternate);	
    	}
    }
	}
}

if (import.meta.hot) {
  import.meta.hot.accept(PatternBase.hotReloadHandler)
}

export default FairySnake;