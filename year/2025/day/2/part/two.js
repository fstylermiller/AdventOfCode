const fs = require("fs");

const raw = fs.readFileSync(__dirname + "/../part/input.txt").toString();

const rangeList = raw
  .replace(/[\r\n]/g, "")
  .split(",")
  .map((text) => text.split("-"));

let total = 0;
const repeatedIds = [];

rangeList.forEach((range) => {
  const [rawStart, rawEnd] = range;
  const start = new Number(rawStart);
  const end = new Number(rawEnd);

  for (let id = start; id <= end; id++) {
    const stringId = id + "";
    // take increasingly larger sections of the string up to 1/2 of the string

    let sectionSize = 1;
    while (sectionSize <= Math.floor(stringId.length / 2)) {
      // check that the initial section repeats
      // if not, break
      // if so, add to total
      const partOfString = stringId.slice(0, sectionSize);
      const incrementSize = partOfString.length;

      // if it fits in evenly
      if (stringId.length % incrementSize === 0) {
        let repeats = true;

        for (
          let sectionStart = 0;
          sectionStart < stringId.length - incrementSize + 1 && repeats;
          sectionStart += incrementSize
        ) {
          const section = stringId.slice(
            sectionStart,
            sectionStart + incrementSize
          );

          if (section !== partOfString) {
            repeats = false;
          }
        }

        if (repeats) {
          total += id;
          repeatedIds.push(id);
          break;
        }
      }

      sectionSize++;
    }
  }
});

console.log(total);
