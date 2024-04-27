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
        console.log(`Test threw an exception: ${errorMessage}`);
        return;
    }
    if (result === targetValue) {
        passedTests += 1;
    } else {
        failedTests += 1;
        console.log(
            `Test failed: ${errorMessage}\nExpected: ${targetValue}\nReceived: ${result}\n`,
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

expect("can insert at the start", () => levenshtein("box", "abox"), 1);

expect("can insert at the end", () => levenshtein("box", "boxa"), 1);

expect("can delete at the start", () => levenshtein("box", "ox"), 1);

expect("can delete at the end", () => levenshtein("box", "bo"), 1);

expect("can replace at the start", () => levenshtein("box", "fox"), 1);

expect("can replace at the end", () => levenshtein("box", "bog"), 1);

expect("can have a cost greater than one", () => levenshtein("box", "rot"), 2);

expect(
    "can limit insertion cost using maxCost",
    () => levenshtein("box", "bzozx", { maxCost: 1 }),
    null,
);

expect(
    "for insertion return correct value if less than maxCost",
    () =>
        levenshtein("box", "bzozx", {
            maxCost: 2,
        }),
    2,
);

expect(
    "can limit deletion cost using maxCost",
    () => levenshtein("water", "wtr", { maxCost: 1 }),
    null,
);

expect(
    "for deletion return correct value if less than maxCost",
    () => levenshtein("water", "wtr", { maxCost: 2 }),
    2,
);

expect(
    "can limit replacement cost using maxCost",
    () => levenshtein("box", "rot", { maxCost: 1 }),
    null,
);

expect(
    "for replacement return correct value if less than maxCost",
    () => levenshtein("box", "rot", { maxCost: 2 }),
    2,
);

expect(
    "can set insertionCost to arbitaryValue",
    () => levenshtein("water", "hwage", { insertionCost: 0.75 }),
    2.75,
);

expect(
    "can set deletionCost to arbitaryValue",
    () => levenshtein("water", "hwage", { deletionCost: 1.25 }),
    3.25,
);

expect(
    "can set replacementCost to arbitaryValue",
    () => levenshtein("water", "hwage", { replacementCost: 1.5 }),
    3.5,
);

console.log(`Passed Tests: ${passedTests}`);
console.log(`Failed Tests: ${failedTests}`);
