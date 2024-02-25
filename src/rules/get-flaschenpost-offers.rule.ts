import { Inventory, Result } from '../client/flaschenpost.response';
import { Offer } from '../models/offers.model';
import { hasArticleOnSaleRule } from './has-article-on-sale.rule';
import { getSavingsAmountRule } from './get-savings-amount.rule';
import { getSavingsPercentRule } from './get-savings-percent.rule';
import { getWebshopUrl } from './get-webshop-url.rule';

export const getFlaschenpostOffersRule = (inventory: Inventory): Offer[] =>
  inventory.results.map((result: Result) => {
    return {
      id: result.articles[0].id,
      name: result.name.trim(),
      description: result.articles[0].shortDescription.includes(' (Glas)')
        ? result.articles[0].shortDescription
            .slice(0, result.articles[0].shortDescription.slice.length - 9)
            .trim()
        : result.articles[0].shortDescription.trim(),
      price: result.articles[0].crossedPrice,
      onSale: hasArticleOnSaleRule(result),
      savings: hasArticleOnSaleRule(result)
        ? {
            amount: getSavingsAmountRule(result),
            percent: getSavingsPercentRule(result),
          }
        : undefined,
      url: getWebshopUrl(result),
    };
  });
