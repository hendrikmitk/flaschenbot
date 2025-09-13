/**
 * Removes packaging type indicators like (Glas), (PET), etc.
 * @param {string} description - The article description to clean.
 * @returns {string} The cleaned article description.
 */
export const cleanArticleDescriptionRule = (description: string): string =>
  description.replace(/\s*\([^)]+\)\s*$/, '').trim();
