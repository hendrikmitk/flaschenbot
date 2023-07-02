import { Inventory, Result } from '../models/inventory.model';
import { Offer } from '../models/offers.model';
import { hasArticleOnSaleRule } from '../rules/has-article-on-sale.rule';
import { getSavingsAmountRule } from '../rules/get-savings-amount.rule';
import { getSavingsPercentRule } from '../rules/get-savings-percent.rule';

export const getFlaschenpostOffers = (inventory: Inventory): Offer[] =>
  inventory.results.map((result: Result) => {
    return {
      name: result.name,
      description: result.articles[0].shortDescription,
      price: result.articles[0].crossedPrice,
      onSale: hasArticleOnSaleRule(result),
      savings: hasArticleOnSaleRule(result)
        ? {
            amount: getSavingsAmountRule(result),
            percent: getSavingsPercentRule(result),
          }
        : undefined,
    };
  });
