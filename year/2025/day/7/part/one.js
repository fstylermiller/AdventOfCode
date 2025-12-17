const fs = require("fs");

const raw = fs.readFileSync(__dirname + "/test-input.txt").toString();

const splitterConfiguration = raw.split("\n").map((row) => row.split(""));
const startingX = splitterConfiguration[0].indexOf("S");

const splitterTree = {
  [`${startingX}/0`]: {
    connections: [],
  },
};
const visited = new Set();

// Create a tree
const splitBeam = (currentPosition, direction) => {
  const { x: initialX, y: initialY } = currentPosition;
  const visitedKey = `${initialX}/${initialY}/${direction}`;

  if (visited.has(visitedKey)) return;
  visited.add(visitedKey);

  if (initialY === splitterConfiguration.length - 1) return;

  const xPosition = initialX + direction;
  let beamDepth = initialY + 1;

  while (beamDepth <= splitterConfiguration.length - 1) {
    if (splitterConfiguration[beamDepth][xPosition] === "^") {
      const splitterKey = `${xPosition}/${beamDepth}`;

      splitterTree[splitterKey] ??= {
        connections: [],
      };

      splitterTree[`${initialX}/${initialY}`].connections.push(splitterKey);

      // if we can go left, go down from there
      if (xPosition !== 0) {
        splitBeam({ x: xPosition, y: beamDepth }, -1);
      }

      // if we can go right, go down from there
      if (xPosition < splitterConfiguration[0].length - 1) {
        splitBeam({ x: xPosition, y: beamDepth }, 1);
      }

      return;
    }
    beamDepth++;
  }
};

console.time("execution time");
splitBeam({ x: startingX, y: 0 }, 0);
console.timeEnd("execution time");

console.log(`Beam split ${Object.keys(splitterTree).length - 1} times`);
