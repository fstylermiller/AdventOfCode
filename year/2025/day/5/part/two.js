const fs = require("fs");

const raw = fs.readFileSync(__dirname + "/../part/input.txt").toString();

const [rawRanges, rawIngredients] = raw.split("\n\n");
const ranges = rawRanges.split("\n").map((whole) => whole.split("-").map(str => new Number(str)));

ranges.sort((a, b) => a[0] < b[0] ? -1 : 1);

const findFreshies = (remainingRanges) => {
  // ranges.map((range) => {
  //   const [lowerBound, upperBound] = range;

  //   ranges.find((compareRange) => {
  //     const [compareLower, compareUpper] = compareRange;
      
  //     if (lowerBound >= compareLower && lowerBound <= compareUpper) {
  //       mergedRanges.push([compareLower])
  //     }

  //     return false
  //   });
  // });
}