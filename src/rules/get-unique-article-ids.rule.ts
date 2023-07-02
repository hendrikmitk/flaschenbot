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
