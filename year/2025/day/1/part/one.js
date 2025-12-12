const fs = require("fs");

const raw = fs.readFileSync(__dirname + "/../part/input.txt").toString();

const sequence = raw
  .split("\n")
  .map((row) => ({
    direction: row.slice(0, 1),
    distance: new Number(row.slice(1)),
  }));

let result = 0;
let position = 50;

sequence.forEach((command) => {
  const { direction, distance } = command;
  const toAdd = direction === "L" ? -1 : 1;

  for (let i = 0; i < distance; i++) {
    position += toAdd;

    if (position > 99) {
      position = 0;
    }

    if (position < 0) {
      position = 99;
    }

    if (position === 0) {
      result++;
    }
  }
});

console.log(result);
// sequence.forEach((move) => {
//   const direction = move.slice(0, 1);
//   const multiplier = direction === "L" ? -1 : 1;
//   const distance = new Number(move.slice(1));
//   const newPosition = currentPosition + (distance * multiplier);

//   if ((newPosition <= 0 && currentPosition !== 0) || newPosition >= MAX) {
//     traveledPastZero++;
//   }
//   const timesOverMaxFromDistance = Math.floor(Math.abs(distance) / MAX);

//   traveledPastZero += timesOverMaxFromDistance;

//   if (newPosition < 0) {
//     currentPosition = MAX + newPosition;
//   } else if (newPosition >= MAX) {
//     currentPosition = newPosition % MAX;
//   } else {
//     currentPosition = newPosition;
//   }
// });

console.log(traveledPastZero);
console.log(numberOfZeros);
