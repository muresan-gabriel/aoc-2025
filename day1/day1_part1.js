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

function main() {
  const instructions = getPuzzleInput();

  const DIAL_MODULUS = 100;

  let dialNumber = 50;
  let timesPointingAt0 = 0;

  for (let instruction of instructions) {
    const { direction, noOfTimes } = extractRotationData(instruction);

    if (directionIsRight(direction)) {
      dialNumber = (dialNumber + noOfTimes) % DIAL_MODULUS;
    } else if (directionIsLeft(direction)) {
      let rawNewNumber = dialNumber - noOfTimes;
      dialNumber =
        ((rawNewNumber % DIAL_MODULUS) + DIAL_MODULUS) % DIAL_MODULUS;
    }

    if (dialNumber === 0) {
      timesPointingAt0++;
    }
  }

  console.log(timesPointingAt0)
}

main();
