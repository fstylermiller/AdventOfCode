const fs = require("fs");

const raw = fs.readFileSync(__dirname + "/../test-input.txt").toString();

const volcano = raw.split("\n").reduce((acc, row) => {
  const words = row.split(" ");
  return {
    ...acc,
    [words[1]]: {
      rate: words[4].split("=")[1].split(";")[0],
      connections: words.slice(9).map((connection) => connection.split(",")[0]),
      isOpen: false,
    },
  };
}, {});

const targets = Object.entries(volcano).reduce((acc, [name, meta]) => {
  const { rate, connections } = meta;
  if (meta.rate > 0) {
    return { ...acc, [name]: { rate, connections } };
  }
  return acc;
}, {});

// release the most pressure in 30 minutes.
// moving to a node is one step, opening a node is a second step

// identify "targets" (valves with non 0 flow rates) and the shortest paths between them
// from the current position, calculate the max distance to the next target
// determine whether in the same amount of minutes multiple other targets could be reached and opened.
// choose the better of the two options

const navigate = (volcano, startPosition) => {
  // startPosition = "AA";
  let currentPosition = startPosition;
  const valveCandidates = findTargetDepths(volcano, currentPosition);
  console.log("Candidates from current position", valveCandidates);
  // sort and collapse valve candidates to identify the initial path.
  // traverse the path, counting minutes used
  // recurse from the new position until minutes used = 30
};

const findTargetDepths = (volcano, startPosition) => {
  const toVisit = [{ name: startPosition, depth: 0, pathTaken: [] }];
  const visited = new Set();
  const result = {};
  let numberOfSteps = 0;

  while (toVisit.length) {
    numberOfSteps++;
    const currentPosition = toVisit.shift();
    const {
      name: currentValve,
      depth,
      pathTaken: currentPath,
    } = currentPosition;

    if (!visited.has(currentValve)) {
      visited.add(currentValve);

      if (targets[currentValve] && !targets[currentValve].isOpen) {
        result[currentValve] = {
          ...volcano[currentValve],
          pathTaken: currentPath,
        };
      }

      const { connections } = volcano[currentValve];
      for (const neighbor of connections) {
        toVisit.push({
          name: neighbor,
          depth: depth + 1,
          pathTaken: [...currentPath, currentValve],
        });
      }
    }
  }

  return result;
};

// console.log("targets", targets);
navigate(volcano, "AA");

// const bfs = (volcano, start) => {
//   const toVisit = [start];
//   const visited = new Set();
//   const result = [];

//   while (toVisit.length) {
//     const valve = toVisit.shift();
//     if (!visited.has(valve)) {
//       visited.add(valve);
//       result.push(valve);

//       const { connections } = volcano[valve];
//       for (const neighbor of connections) {
//         toVisit.push(neighbor);
//       }
//     }
//   }

//   return result;
// };
