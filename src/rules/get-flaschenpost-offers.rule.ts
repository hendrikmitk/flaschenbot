import { Inventory, Result } from '../client/flaschenpost.response';
import { Offer } from '../models/offers.model';
import { cleanArticleDescriptionRule } from './clean-article-description.rule';
import { getSavingsAmountRule } from './get-savings-amount.rule';
import { getSavingsPercentRule } from './get-savings-percent.rule';
import { getWebshopUrl } from './get-webshop-url.rule';

/**
 * Retrieves offers from Flaschenpost.
 * @param {Inventory} inventory - The inventory to retrieve offers from.
 * @returns {Offer[]} The retrieved offers.
 */
export const getFlaschenpostOffersRule = (inventory: Inventory): Offer[] =>
  inventory.results.map((result: Result) => {
    const article = result.articles[0];
    const isOnSale = article.offerPrice < article.price;

    return {
      id: article.id,
      name: result.name.trim(),
      description: cleanArticleDescriptionRule(article.shortDescription),
      price: article.crossedPrice,
      onSale: isOnSale,
      savings: isOnSale
        ? {
            amount: getSavingsAmountRule(result),
            percent: getSavingsPercentRule(result),
          }
        : undefined,
      url: getWebshopUrl(result),
    };
  });
