export type Rule = {
  version: string;
  pages: RulePage[];
};

export type RulePage = {
  path: string;
  document: string;
};
