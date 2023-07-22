"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeMastodonStatusRule = void 0;
const composeMastodonStatusRule = (offersOnSale) => {
    const parts = offersOnSale.map((offerOnSale) => { var _a; return `${(_a = offerOnSale.savings) === null || _a === void 0 ? void 0 : _a.amount} on ${offerOnSale.name} ${offerOnSale.description}`; });
    let message = '@hendrik@mas.to Save ';
    for (let i = 0; i < parts.length; i++) {
        const isLastItem = i === parts.length - 1;
        const isSecondToLastItem = i === parts.length - 2;
        message += parts[i];
        if (!isLastItem && !isSecondToLastItem)
            message += ', ';
        if (isSecondToLastItem)
            message += ' and ';
    }
    return message;
};
exports.composeMastodonStatusRule = composeMastodonStatusRule;
