export type LevenshteinOptions = {
  maxCost?: number;
  insertionCost?: number;
  deletionCost?: number;
  replacementCost?: number;
};

type LevenshteinImplConfig = {
  a: string;
  b: string;
  maxCost: number;
  insertionCost: number;
  deletionCost: number;
  replacementCost: number;
};

const levenshteinImpl = (
  config: LevenshteinImplConfig,
  aIndex: number,
  bIndex: number,
  cost: number,
): number | null => {
  return null;
};

export const levenshtein = (
  a: string,
  b: string,
  options?: LevenshteinOptions,
) => 5;
