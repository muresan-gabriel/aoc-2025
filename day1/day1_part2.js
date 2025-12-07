import fs from "fs";

function extractRotationData(instruction) {
  const direction = instruction[0];

  const characterListFromInstruction = instruction.split("");

  characterListFromInstruction.shift();

  if (
    characterListFromInstruction[characterListFromInstruction.length - 1] ===
    "\r"
  ) {
    characterListFromInstruction.pop();
  }

  const noOfTimes = characterListFromInstruction.toString().replaceAll(",", "");

  return { direction, noOfTimes: Number(noOfTimes) };
}

function getPuzzleInput() {
  return fs.readFileSync("./day1_input", "utf8").split("\n");
}

function directionIsRight(direction) {
  return direction === "R";
}

function directionIsLeft(direction) {
  return direction === "L";
}

function calculateZeroPasses(dialNumber, direction, noOfTimes) {
  let hits = 0;

  if (directionIsRight(direction)) {
    const distanceToFirstZero = (100 - dialNumber) % 100;

    if (noOfTimes >= distanceToFirstZero) {
      hits = 1 + Math.floor((noOfTimes - distanceToFirstZero) / 100);

      if (dialNumber === 0) {
        hits = Math.floor(noOfTimes / 100);
      }
    }
  } else if (directionIsLeft(direction)) {
    const distanceToFirstZero = dialNumber;

    if (noOfTimes >= distanceToFirstZero && noOfTimes > 0) {
      hits = 1 + Math.floor((noOfTimes - distanceToFirstZero) / 100);

      if (dialNumber === 0) {
        hits = Math.floor(noOfTimes / 100);
      }
    }
  }

  if (noOfTimes === 0) return 0;

  return hits;
}

async function main() {
  let totalZeroPasses = 0;
  let dialNumber = 50;
  const instructions = getPuzzleInput();

  if (instructions.length === 0) {
    return;
  }

  for (let instruction of instructions) {
    const { direction, noOfTimes } = extractRotationData(instruction);

    const zeroPasses = calculateZeroPasses(dialNumber, direction, noOfTimes);

    if (directionIsRight(direction)) {
      dialNumber += noOfTimes;
    } else if (directionIsLeft(direction)) {
      dialNumber -= noOfTimes;
    }

    dialNumber = ((dialNumber % 100) + 100) % 100;

    totalZeroPasses += zeroPasses;
  }
  console.log(totalZeroPasses);
}

main();
