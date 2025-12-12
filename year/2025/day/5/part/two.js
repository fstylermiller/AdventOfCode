const fs = require("fs");

const raw = fs.readFileSync(__dirname + "/../part/input.txt").toString();

const rawRanges = raw.split("\n\n")[0];
const ranges = rawRanges.split("\n").map((whole) => whole.split("-").map(str => new Number(str)));

ranges.sort((a, b) => a[0] < b[0] ? -1 : 1);

const findFreshies = (remainingRanges, compareIndex) => {
  if (compareIndex > remainingRanges.length - 2) {
    return remainingRanges;
  }

  const [lowerBound, upperBound] = remainingRanges[compareIndex];
  const [compareLower, compareUpper] = remainingRanges[compareIndex + 1];

  if (compareLower <= upperBound) {
    const newRange = [lowerBound, upperBound > compareUpper ? upperBound : compareUpper];

    remainingRanges[compareIndex] = newRange;
    remainingRanges.splice(compareIndex + 1, 1);

    return findFreshies(remainingRanges, compareIndex);
  }

  return findFreshies(remainingRanges, compareIndex + 1);
}

const mergedRanges = findFreshies(ranges, 0);

const count = mergedRanges.reduce((acc, range) => {
  const [lower, upper] = range;
  return acc + upper - lower + 1
}, 0);

console.log(count);

// const mergeRanges = (ranges) => {
//   // if lowerBound exists in a range within ranges, consolidate
  
//   // base case is that the lower bound does not exist in another range, return the ranges
// }