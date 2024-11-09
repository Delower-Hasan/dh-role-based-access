export const matchesPath = (patterns: string[] = [], path: string) => {
  return patterns.some((pattern) => {
    const regex = new RegExp(`^${pattern.replace(/\*/g, ".*")}$`);
    return regex.test(path);
  });
};
