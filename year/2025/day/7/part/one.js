const fs = require("fs");

const raw = fs.readFileSync(__dirname + "/test-input.txt").toString();

const splitterConfiguration = raw.split("\n").map((row) => row.split(""));
const splitterVisualization = JSON.parse(JSON.stringify(splitterConfiguration));
const startingX = splitterConfiguration[0].indexOf("S");

const splitterTree = {
  [`${startingX}/0`]: {
    connections: [],
  },
};

// Create a tree
const splitBeam = (currentPosition, direction) => {
  const { x: initialX, y: initialY } = currentPosition;

  if (initialY === splitterConfiguration.length - 1) {
    return;
  }

  let newSplitterFound = false;
  const xPosition = initialX + direction;
  let beamDepth = initialY + 1;

  while (!newSplitterFound && beamDepth <= splitterConfiguration.length - 1) {
    if (splitterConfiguration[beamDepth][xPosition] === "^") {
      // if this node hasn't been found, add it to the tree, and add a reference to the parent
      const isNew = !splitterTree[`${xPosition}/${beamDepth}`];
      if (isNew) {
        newSplitterFound = true;
        splitterTree[`${xPosition}/${beamDepth}`] = {
          connections: [],
        };

        splitterTree[`${initialX}/${initialY}`].connections.push(
          `${xPosition}/${beamDepth}`
        );

        // if we can go left, go down from there
        if (xPosition !== 0) {
          splitBeam({ x: xPosition, y: beamDepth }, -1);
        }

        // if we can go right, go down from there
        if (xPosition < splitterConfiguration[0].length - 1) {
          splitBeam({ x: xPosition, y: beamDepth }, 1);
        }
      }
    } else {
      splitterVisualization[beamDepth][xPosition] = "|";
    }

    beamDepth++;
  }
};

console.time("execution time");
splitBeam({ x: startingX, y: 0 }, 0);
console.timeEnd("execution time");

const fileData = splitterVisualization.reduce(
  (acc, row) => acc + row.join(" ") + "\n",
  ""
);

fs.writeFileSync("./visualization.txt", fileData);

console.log(`Beam split ${Object.keys(splitterTree).length - 1} times`);
