import { Result } from '../client/flaschenpost.response';

/**
 * Retrieves the savings percent for a given offer.
 * @param {Result} result - The result to retrieve the savings percent from.
 * @returns {string} The savings percent.
 */
export const getSavingsPercentRule = (result: Result): string =>
  new Intl.NumberFormat('de-DE', {
    style: 'percent',
  }).format(
    (result.articles[0].price - result.articles[0].offerPrice) /
      result.articles[0].price
  );
