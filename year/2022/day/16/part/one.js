const fs = require("fs");

const raw = fs.readFileSync(__dirname + "/../test-input.txt").toString();

const volcano = raw.split("\n").reduce((acc, row) => {
  const words = row.split(" ");
  return {
    ...acc,
    [words[1]]: {
      rate: new Number(words[4].split("=")[1].split(";")[0]),
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

const navigate = (volcano, startPosition, remainingTime, pressure) => {
  const options = findTargetDepths(volcano, startPosition, remainingTime);
  const target = determineTarget(options, remainingTime);
  const {
    name: nextPosition,
    timeCost,
    releasedPressure,
    valvesOpened,
  } = target;

  if (!nextPosition) {
    return pressure;
  }

  remainingTime -= timeCost;
  pressure += releasedPressure;

  valvesOpened.forEach((valve) => {
    volcano[valve].isOpen = true;
    delete targets[valve];
  });

  if (remainingTime > 0) {
    return navigate(volcano, nextPosition, remainingTime, pressure);
  }

  return pressure;
};

// Given a map of target valves and directions to get there
// determine the best possible route (weighted)
const determineTarget = (targets, remainingTime) => {
  const pathValues = {};
  let releasedPressure = 0;

  Object.entries(targets).forEach(([name, meta]) => {
    let timeCost = 0;
    let valvesOpened = [];

    const { pathTaken, rate: finalValveRate } = meta;

    for (valve of pathTaken) {
      const { rate, isOpen } = volcano[valve];

      // If the valve in the path is not open, and has a nonzero flow rate, take an extra minute to open it.
      if (!isOpen && rate > 0 && remainingTime - (timeCost + 2) > 0) {
        timeCost += 2;
        releasedPressure += rate * (remainingTime - timeCost);
        valvesOpened.push[valve];
      } else {
        timeCost++;
      }
    }

    timeCost += 2;
    releasedPressure = finalValveRate * (remainingTime - timeCost);

    pathValues[name] = {
      name,
      valvesOpened: [...valvesOpened, name],
      weight: releasedPressure / timeCost,
      releasedPressure,
      timeCost,
    };
  });

  return Object.keys(pathValues).reduce(
    (acc, path) => {
      return acc.weight < pathValues[path].weight ? pathValues[path] : acc;
    },
    { weight: -1 }
  );
};

/**
 * Finds paths to all remaining targets from a given starting position
 * @param {*} volcano A map of valves and their connections
 * @param {*} startPosition The starting position
 * @param {*} initialTime The amount of time left (maximum depth possible)
 * @returns A modified map of targets that includes directions to it (pathTaken)
 */
const findTargetDepths = (volcano, startPosition, remainingTime) => {
  const toVisit = [{ name: startPosition, depth: 0, pathTaken: [] }];
  const visited = new Set();
  const result = {};

  while (toVisit.length) {
    const currentPosition = toVisit.shift();
    const {
      name: currentValve,
      depth,
      pathTaken: currentPath,
    } = currentPosition;

    if (
      !visited.has(currentValve) &&
      // potential off by one here
      remainingTime - currentPath.length > 0
    ) {
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

const startPosition = "AA";
const timeRemaining = 30;
const pressure = 0;

const bestPressure = navigate(volcano, startPosition, timeRemaining, pressure);

console.log(`released ${bestPressure} psi`);
console.log(`remainingTargets:`, targets);
