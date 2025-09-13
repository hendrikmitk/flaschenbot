import { Result } from '../client/flaschenpost.response';

/**
 * Retrieves the webshop URL for a given offer.
 * @param {Result} result - The result to retrieve the webshop URL from.
 * @returns {string} The webshop URL.
 */
export const getWebshopUrl = (result: Result): string =>
  `https://www.flaschenpost.de/p/${result.brandWebShopUrl}/${result.webShopUrl}`;
