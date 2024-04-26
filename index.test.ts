import { levenshtein } from "./index.js";

let passedTests = 0;
let failedTests = 0;

const expect = (
  errorMessage: string,
  resolver: () => number | null,
  targetValue: number | null,
) => {
  let result;
  try {
    result = resolver();
  } catch (e: any) {
    failedTests += 1;
    console.log(`Test threw an exception:\n${errorMessage}`);
    return;
  }
  if (result === targetValue) {
    passedTests += 1;
  } else {
    failedTests += 1;
    console.log(
      `Test failed:\n${errorMessage}\nExpected ${targetValue}\nReceived: ${result}\n`,
    );
  }
};

expect("distance between empty strings is zero", () => levenshtein("", ""), 0);

expect(
  "distance between identical strings is zero",
  () => levenshtein("a", "a"),
  0,
);

expect("one insertion has cost 1", () => levenshtein("", "a"), 1);

expect("one deletion has cost 1", () => levenshtein("a", ""), 1);

expect("one replacement has cost 1", () => levenshtein("a", "b"), 1);

console.log(`Passed Tests: ${passedTests}`);
console.log(`Failed Tests: ${failedTests}`);
