import { FlaschenpostProduct } from '../client/flaschenpost.response';

/**
 * Retrieves the savings amount for a given product on sale.
 * @param {FlaschenpostProduct} product - The product to retrieve the savings amount from.
 * @returns {string} The savings amount, formatted as EUR currency.
 */
export const getSavingsAmountRule = (product: FlaschenpostProduct): string => {
  const offerCents = product.masterVariant.price.value.centAmount;
  const regularCents =
    product.masterVariant.price.custom?.fields?.RegularPrice?.centAmount ??
    offerCents;
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format((regularCents - offerCents) / 100);
};
