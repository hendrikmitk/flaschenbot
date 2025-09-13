/**
 * Retrieves unique article IDs from the given query parameters.
 * @param {string[] | string} idQueryParams - The query parameters to retrieve unique article IDs from.
 * @returns {string[]} The unique article IDs.
 */
export const getUniqueArticleIdsRule = (
  idQueryParams: string[] | string
): string[] => {
  const articleIds: string[] = [];

  if (Array.isArray(idQueryParams)) {
    idQueryParams.forEach((param) => {
      articleIds.push(param.toString());
    });
  } else if (typeof idQueryParams === 'string') {
    articleIds.push(idQueryParams);
  }

  return [...new Set(articleIds)];
};
