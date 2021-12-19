# Entwined Web

This is a work-in-progress web port of the Entwined project (https://github.com/squaredproject/Entwined). Made with ThreeJS.

### Live demo: https://omarshehata.github.io/entwined-web/

![entwined-preview](https://user-images.githubusercontent.com/1711126/146686446-835e4be3-471d-4fdd-971f-3a9621a09ffa.gif)

I wanted to put this together to make creating Entwined patterns a little more accessible, so those interested in creating patterns can just load a Glitch/Codesandbox etc and start exploring immediately in the browser. I also found it a bit hard to prototype new patterns in Java and having to recompile to see changes. This project is missing many features and does NOT actually connect to the real Entwined art installation, but I find it helpful to explore here and figure out what I want to create, and then port it to Java.

It would be great to extend this if there is interest to a support all features & actually connect to the hardware!

It currently supports:

* ✔️ Fairy circles, trees, & shrubs, loaded from the JSON config files of the original project
* ✔️ All cube variables in the original are support (global position, position within sculpture, polar coordinates etc)
* ✔️ Hot reload so you can explore & build patterns interactively

Preview of building a pattern with hot reload:

https://user-images.githubusercontent.com/1711126/146687633-339c650e-54c1-4ccf-a4f8-8dbc4c6aff00.mp4

## Running locally

Clone this repo, run `npm install`, and then `npm run dev`. Open http://localhost:3000. 

Pattern files are under `src/patterns/`. `src/patterns/PatternBase.js` contains some helper functions that all patterns have access to. `src/BaseCube.js` contains all the properties on individual cubes. 

## Creating a new pattern

1. Create a new file using `src/patterns/demo.js` as a base
2. Rename "Demo" to your own pattern name at the top (`class Demo extends ...`) and at the bottom `export default Demo`
3. Add it to the UI list in `src/LoadPatterns.js`. This should be **the name of the file**, not the class name.

## Missing features

The biggest missing things are (1) Inability to actually drive the hardware, requiring people to port their patterns to Java to submit them (2) missing modulators/little helper functions for creating patterns, and (3) GUI controls for pattern variables & ability to mix/interpolate between multiple patterns. 

Other items on my mind:

* My shrub implementation is kind of "faked". I couldn't successfully port the exact logic from Java, so I recreated it as best I could with some randomness in there.
* It would be really cool to show an example of how individual patterns can create dat.gui buttons/sliders 
* It would be useful to support clicking on individual cubes to get their position/name/information as a helpful debug thing
* Create some modulator helper functions so users creating patterns can just say "I want this value to alternate between X to Y as a sine wave" without having to do this manually
* Set up first person controls to allow a user to see what it would be really like to stand there in person at the art installation
  * See: https://threejs.org/docs/#examples/en/controls/FirstPersonControls 

I'm particularly excited about the first person view mode because I think it creates a very different effect to be standing there in person, and I think it would be cool to see that while designing.

![entwined-fps](https://user-images.githubusercontent.com/1711126/146687648-96ad0a6c-8f45-477f-acbc-cfd641524b58.gif)

