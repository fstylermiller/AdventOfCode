const fs = require("fs");

const raw = fs.readFileSync(__dirname + "/../part/input.txt").toString();

const stringBanks = raw.split("\n");
const banks = stringBanks.map((row) =>
  row.split("").map((str) => new Number(str))
);

const calculateJoltz = () => {
  let totalJoltz = 0;

  for (bank of banks) {
    const countedJoltz = new Number(getMaxBank(bank, 12));
    totalJoltz += countedJoltz;
  }

  return totalJoltz;
};

const getMaxBank = (bank, remainingDigits) => {
  // find largest number and it's index
  const biggestJolt = bank
    .slice(0, bank.length - (remainingDigits - 1))
    .reduce((acc, jolt) => (acc < jolt ? jolt : acc), 0);
  const joltIndex = bank.indexOf(biggestJolt);

  if (remainingDigits === 1) {
    return `${biggestJolt}`;
  }

  return (
    `${biggestJolt}` +
    getMaxBank(bank.slice(joltIndex + 1), remainingDigits - 1)
  );
};

const gigaJoltz = calculateJoltz();

console.log(gigaJoltz);
