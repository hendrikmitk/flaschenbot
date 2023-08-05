"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotionFavoritesRule = void 0;
const getNotionFavoritesRule = (results) => results.map((result) => {
    var _a;
    return {
        id: result.id,
        active: ((_a = result.properties.active) === null || _a === void 0 ? void 0 : _a.checkbox) || false,
        article_name: result.properties.article_name.title[0].plain_text,
        flaschenpost_id: result.properties.flaschenpost_id.number,
    };
});
exports.getNotionFavoritesRule = getNotionFavoritesRule;
