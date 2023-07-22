"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSavingsPercentRule = void 0;
const getSavingsPercentRule = (result) => new Intl.NumberFormat('de-DE', {
    style: 'percent',
}).format(result.articles[0].crossedPrice / result.articles[0].price - 1);
exports.getSavingsPercentRule = getSavingsPercentRule;
