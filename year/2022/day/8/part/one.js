const fs = require("fs");

const raw = fs.readFileSync(__dirname + "/../input.txt").toString();

const forest = raw
  .split("\n")
  .map((row) => row.split("").map((height) => Number(height)));

const MAX_HEIGHT = 9;
const foundTrees = {};
/**
 * {
 *  '0/1': true
 * }
 */

// left to right
for (let y = 0; y < forest.length; y++) {
  let currentMax = -1;
  for (let x = 0; x < forest[y].length; x++) {
    const height = forest[y][x];

    if (height > currentMax) {
      foundTrees[`${x}/${y}`] = true;
      currentMax = height;
    }

    if (height >= MAX_HEIGHT) {
      break;
    }
  }
}

// right to left
for (let y = 0; y <= forest.length - 1; y++) {
  let currentMax = -1;
  for (let x = forest[y].length - 1; x >= 0; x--) {
    const height = forest[y][x];

    if (height > currentMax) {
      foundTrees[`${x}/${y}`] = true;
      currentMax = height;
    }

    if (height >= MAX_HEIGHT) {
      break;
    }
  }
}

const forestWidth = forest[0].length - 1;

// top to bottom
for (let x = 0; x <= forestWidth; x++) {
  let currentMax = -1;
  for (let y = 0; y <= forest.length - 1; y++) {
    const height = forest[y][x];

    if (height > currentMax) {
      foundTrees[`${x}/${y}`] = true;
      currentMax = height;
    }

    if (height >= MAX_HEIGHT) {
      break;
    }
  }
}

// bottom to top
for (let x = 0; x <= forestWidth; x++) {
  let currentMax = -1;
  for (let y = forest.length - 1; y >= 0; y--) {
    const height = forest[y][x];

    if (height > currentMax) {
      foundTrees[`${x}/${y}`] = true;
      currentMax = height;
    }

    if (height >= MAX_HEIGHT) {
      break;
    }
  }
}

const final = Object.keys(foundTrees).length;

console.log(`found ${final} visible trees`);

// let logOutput = "";

// for (let y = 0; y < forest.length; y++) {
//   for (let x = 0; x < forest[y].length; x++) {
//     if (foundTrees[`${x}/${y}`]) {
//       logOutput += "X";
//     } else {
//       logOutput += "O";
//     }
//   }
//   logOutput += "\n";
// }
