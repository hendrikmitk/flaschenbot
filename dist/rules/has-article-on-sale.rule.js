"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasArticleOnSaleRule = void 0;
const hasArticleOnSaleRule = (result) => result.articles[0].crossedPrice < result.articles[0].price;
exports.hasArticleOnSaleRule = hasArticleOnSaleRule;
