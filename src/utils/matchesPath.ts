import wildcard from "wildcard";

export const matchesPath = (patterns: string[] = [], path: string) => {
  return patterns.some((pattern) => wildcard(pattern, path));
};
