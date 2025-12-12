const fs = require("fs");

const raw = fs.readFileSync(__dirname + "/../part/input.txt").toString();

const stringBanks = raw.split("\n");
const banks = stringBanks.map((row) =>
  row.split("").map((str) => new Number(str))
);

let totalJoltz = 0;

banks.forEach((row) => {
  let maxFirstDigit = 0;
  let firstDigitPos = 0;
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] > maxFirstDigit) {
      maxFirstDigit = row[i];
      firstDigitPos = i;
    }
  }

  let maxSecondDigit = 0;
  for (let i = firstDigitPos + 1; i < row.length; i++) {
    if (row[i] > maxSecondDigit) {
      maxSecondDigit = row[i];
    }
  }

  totalJoltz += maxFirstDigit * 10 + maxSecondDigit;
});

console.log(totalJoltz);
