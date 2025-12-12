const fs = require("fs");

const raw = fs.readFileSync(__dirname + "/input.txt").toString();

const grid = raw.split("\n").map((row) => row.split(""));

const indexMap = {
  ".": 0,
  "@": 1,
};

const isAccessible = (x, y) => {
  // check the 8 adjacent positions
  let surroundingCount = 0;

  // top left
  if (!indexMap?.[grid?.[y - 1]?.[x - 1]]) {
    surroundingCount++;
  }
  // top
  if (!indexMap?.[grid?.[y - 1]?.[x]]) {
    surroundingCount++;
  }
  // top right
  if (!indexMap?.[grid?.[y - 1]?.[x + 1]]) {
    surroundingCount++;
  }
  // left
  if (!indexMap?.[grid?.[y]?.[x - 1]]) {
    surroundingCount++;
  }
  // right
  if (!indexMap?.[grid?.[y]?.[x + 1]]) {
    surroundingCount++;
  }
  // bottom left
  if (!indexMap?.[grid?.[y + 1]?.[x - 1]]) {
    surroundingCount++;
  }
  // bottom
  if (!indexMap?.[grid?.[y + 1]?.[x]]) {
    surroundingCount++;
  }
  // bottom right
  if (!indexMap?.[grid?.[y + 1]?.[x + 1]]) {
    surroundingCount++;
  }

  return surroundingCount > 4;
};

const findAccessibleRolls = () => {
  let count = 0;
  grid.forEach((row, y) => {
    row.forEach((col, x) => {
      if (grid[y][x] === "@" && isAccessible(x, y)) {
        count++;
      }
    });
  });

  return count;
};

console.log(`Found ${findAccessibleRolls()} accessible rolls`);
