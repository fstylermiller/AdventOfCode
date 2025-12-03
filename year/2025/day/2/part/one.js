const fs = require("fs");

const raw = fs.readFileSync(__dirname + "/../part/input.txt").toString();

const rangeList = raw.replace(/[\r\n]/g, "").split(",").map((text) => text.split("-"));

let total = 0;

rangeList.forEach(range => {
  const [rawStart, rawEnd] = range;
  const start = new Number(rawStart);
  const end = new Number(rawEnd);

  for (let id = start; id <= end; id++) {
    const stringId = id + "";
    
    if (stringId.length % 2 === 0) {
      const midPoint = stringId.length / 2;
      const firstHalf = stringId.slice(0, midPoint);
      const secondHalf = stringId.slice(midPoint);

      if (firstHalf === secondHalf) {
        total += id;
      }
    }
  }
})

console.log(total);
