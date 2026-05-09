import { FlaschenpostProduct } from '../client/flaschenpost.response';
import { Offer } from '../models/offers.model';
import { cleanArticleDescriptionRule } from './clean-article-description.rule';
import { getSavingsAmountRule } from './get-savings-amount.rule';
import { getSavingsPercentRule } from './get-savings-percent.rule';
import { getWebshopUrl } from './get-webshop-url.rule';

const findAttributeValue = (
  product: FlaschenpostProduct,
  name: string,
): unknown =>
  product.masterVariant?.attributes?.find((a) => a.name === name)?.value;

/**
 * Retrieves offers from Flaschenpost.
 * @param {FlaschenpostProduct[]} products - The products to retrieve offers from.
 * @returns {Offer[]} The retrieved offers.
 */
export const getFlaschenpostOffersRule = (
  products: FlaschenpostProduct[],
): Offer[] =>
  products
    .filter((product) => product?.masterVariant?.price?.value)
    .map((product) => {
      const price = product.masterVariant.price;
      const offerCents = price.value.centAmount;
      const regularCents = price.custom?.fields?.RegularPrice?.centAmount;
      const isOnSale =
        regularCents !== undefined && offerCents < regularCents;
      const articleDescription =
        (findAttributeValue(product, 'ArticleDescription') as
          | string
          | undefined) ?? '';

      return {
        id: parseInt(product.key, 10),
        name: product.name['de-DE'].trim(),
        description: cleanArticleDescriptionRule(articleDescription),
        price: (regularCents ?? offerCents) / 100,
        onSale: isOnSale,
        savings: isOnSale
          ? {
              amount: getSavingsAmountRule(product),
              percent: getSavingsPercentRule(product),
            }
          : undefined,
        url: getWebshopUrl(product),
      };
    });
