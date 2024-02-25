"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebshopUrl = void 0;
const getWebshopUrl = (result) => {
    return `https://www.flaschenpost.de/p/${result.brandWebShopUrl}/${result.webShopUrl}`;
};
exports.getWebshopUrl = getWebshopUrl;
