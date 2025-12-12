const fs = require("fs");

const raw = fs.readFileSync(__dirname + "/input.txt").toString();

const doCephalopodHomework = () => {
  const isAddition = {
    "*": false,
    "+": true,
  };

  const problems = raw
    .split("\n")
    .map((row) => row.split(" ").filter((column) => column !== ""));

  let answer = 0;

  for (let x = 0; x < problems[0].length; x++) {
    const operator = problems[problems.length - 1][x];
    let problemResult = isAddition[operator] ? 0 : 1;

    for (let y = problems.length - 2; y >= 0; y--) {
      const number = new Number(problems[y][x]);

      if (isAddition[operator]) {
        problemResult += number;
      } else {
        problemResult *= number;
      }
    }

    answer += problemResult;
  }

  return answer;
};

const finalAnswer = doCephalopodHomework();

console.log(`homework answer = ${finalAnswer}`);
