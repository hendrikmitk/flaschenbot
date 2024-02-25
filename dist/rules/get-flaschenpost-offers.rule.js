"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlaschenpostOffersRule = void 0;
const has_article_on_sale_rule_1 = require("./has-article-on-sale.rule");
const get_savings_amount_rule_1 = require("./get-savings-amount.rule");
const get_savings_percent_rule_1 = require("./get-savings-percent.rule");
const get_webshop_url_rule_1 = require("./get-webshop-url.rule");
const getFlaschenpostOffersRule = (inventory) => inventory.results.map((result) => {
    return {
        id: result.articles[0].id,
        name: result.name.trim(),
        description: result.articles[0].shortDescription.includes(' (Glas)')
            ? result.articles[0].shortDescription
                .slice(0, result.articles[0].shortDescription.slice.length - 9)
                .trim()
            : result.articles[0].shortDescription.trim(),
        price: result.articles[0].crossedPrice,
        onSale: (0, has_article_on_sale_rule_1.hasArticleOnSaleRule)(result),
        savings: (0, has_article_on_sale_rule_1.hasArticleOnSaleRule)(result)
            ? {
                amount: (0, get_savings_amount_rule_1.getSavingsAmountRule)(result),
                percent: (0, get_savings_percent_rule_1.getSavingsPercentRule)(result),
            }
            : undefined,
        url: (0, get_webshop_url_rule_1.getWebshopUrl)(result),
    };
});
exports.getFlaschenpostOffersRule = getFlaschenpostOffersRule;
