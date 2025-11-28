const fs = require("fs");

const raw = fs.readFileSync(__dirname + "/../input.txt").toString();
const forest = raw
  .split("\n")
  .map((row) => row.split("").map((height) => Number(height)));

const traverse = (startX, startY) => {
  const initialHeight = forest[startY][startX];

  // left to right
  let rightDistance = 0;
  for (let x = startX + 1; x < forest[startY].length; x++) {
    const currentHeight = forest[startY][x];
    rightDistance++;

    if (currentHeight >= initialHeight) {
      break;
    }
  }

  // right to left
  let leftDistance = 0;
  for (let x = startX - 1; x >= 0; x--) {
    const currentHeight = forest[startY][x];
    leftDistance++;

    if (currentHeight >= initialHeight) {
      break;
    }
  }

  // top to bottom
  let bottomDistance = 0;

  for (let y = startY + 1; y <= forest.length - 1; y++) {
    const currentHeight = forest[y][startX];
    bottomDistance++;

    if (currentHeight >= initialHeight) {
      break;
    }
  }

  // bottom to top
  let topDistance = 0;
  for (let y = startY - 1; y >= 0; y--) {
    const currentHeight = forest[y][startX];
    topDistance++;

    if (currentHeight >= initialHeight) {
      break;
    }
  }

  return rightDistance * leftDistance * bottomDistance * topDistance;
};

const findBestView = () => {
  let maxScenicScore = 0;

  for (let y = 0; y < forest.length; y++) {
    for (let x = 0; x < forest[y].length; x++) {
      const currentScenicScore = traverse(x, y);
      if (currentScenicScore > maxScenicScore) {
        maxScenicScore = currentScenicScore;
      }
    }
  }

  return maxScenicScore;
};

console.log(findBestView());
