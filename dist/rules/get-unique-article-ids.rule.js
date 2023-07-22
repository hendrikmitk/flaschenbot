"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueArticleIdsRule = void 0;
const getUniqueArticleIdsRule = (idQueryParams) => {
    const articleIds = [];
    if (Array.isArray(idQueryParams)) {
        idQueryParams.forEach((param) => {
            articleIds.push(param.toString());
        });
    }
    else if (typeof idQueryParams === 'string') {
        articleIds.push(idQueryParams);
    }
    return [...new Set(articleIds)];
};
exports.getUniqueArticleIdsRule = getUniqueArticleIdsRule;
