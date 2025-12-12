const fs = require("fs");

const raw = fs.readFileSync(__dirname + "/../part/input.txt").toString();

const [rawRanges, rawIngredients] = raw.split("\n\n");
const ranges = rawRanges.split("\n").map((whole) => whole.split("-").map(str => new Number(str)));
const ingredients = rawIngredients.split("\n").map(str => new Number(str));

ranges.sort((a, b) => a[0] < b[0] ? -1 : 1);

let numFresh = 0;

ingredients.forEach(ingredient => {
  let index = 0;
  while (index < ranges.length) {
    const [lowerBound, upperBound] = ranges[index];
    if (ingredient >= lowerBound && ingredient <= upperBound) {
      numFresh++;
      break;
    }

    index++;
  }
});


console.log(numFresh);