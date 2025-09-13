import { Result } from '../client/flaschenpost.response';

/**
 * Retrieves the savings amount for a given offer.
 * @param {Result} result - The result to retrieve the savings amount from.
 * @returns {string} The savings amount.
 */
export const getSavingsAmountRule = (result: Result): string =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
    result.articles[0].price - result.articles[0].offerPrice
  );
