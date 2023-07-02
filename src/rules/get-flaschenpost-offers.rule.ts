import { Inventory, Result } from '../models/inventory.model';
import { Offer } from '../models/offers.model';
import { hasArticleOnSaleRule } from './has-article-on-sale.rule';
import { getSavingsAmountRule } from './get-savings-amount.rule';
import { getSavingsPercentRule } from './get-savings-percent.rule';

export const getFlaschenpostOffersRule = (inventory: Inventory): Offer[] =>
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