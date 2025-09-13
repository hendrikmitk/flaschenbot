export const cleanArticleDescriptionRule = (description: string): string =>
  description.replace(/\s*\([^)]+\)\s*$/, '').trim();
