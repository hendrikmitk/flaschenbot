import { FlaschenpostProduct } from '../client/flaschenpost.response';

/**
 * Retrieves the savings percent for a given product on sale.
 * @param {FlaschenpostProduct} product - The product to retrieve the savings percent from.
 * @returns {string} The savings percent, formatted with locale de-DE.
 */
export const getSavingsPercentRule = (product: FlaschenpostProduct): string => {
  const offerCents = product.masterVariant.price.value.centAmount;
  const regularCents =
    product.masterVariant.price.custom?.fields?.RegularPrice?.centAmount ??
    offerCents;
  return new Intl.NumberFormat('de-DE', { style: 'percent' }).format(
    (regularCents - offerCents) / regularCents,
  );
};
