"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSavingsAmountRule = void 0;
const getSavingsAmountRule = (result) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(result.articles[0].price - result.articles[0].crossedPrice);
exports.getSavingsAmountRule = getSavingsAmountRule;
