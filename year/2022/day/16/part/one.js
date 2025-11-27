const fs = require("fs");

const raw = fs.readFileSync("../test-input.txt").toString();

const parsed = raw.split("\n").reduce((acc, row) => {
  const words = row.split(" ");
  return {
    ...acc,
    [words[1]]: {
      rate: words[4].split("=")[1].split(";")[0],
      connections: words.slice(9).map((connection) => connection.split(",")[0]),
    },
  };
}, {});

Object.entries(parsed).forEach(([name, info]) => {
  console.log(name, info);
});
