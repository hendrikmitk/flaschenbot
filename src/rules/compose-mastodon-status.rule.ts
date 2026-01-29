import { Offer } from '../models/offers.model';

/**
 * Composes a Mastodon status message from the given offers on sale.
 * @param {Offer[]} offersOnSale - The offers on sale to compose the status for.
 * @returns {string} The composed Mastodon status message.
 */
export const composeMastodonStatusRule = (offersOnSale: Offer[]): string => {
  const lines: string[] = offersOnSale.map((offer: Offer) => {
    const emojiSuffix = offer.emoji ? ` ${offer.emoji}` : '';
    return `Save ${offer.savings?.amount} on ${offer.name} ${offer.description}${emojiSuffix} ${offer.url}`;
  });

  return lines.join('\n');
};
