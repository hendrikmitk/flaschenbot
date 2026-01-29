import { Offer } from '../models/offers.model';

/**
 * Composes a Mastodon status message from the given offers on sale.
 * @param {Offer[]} offersOnSale - The offers on sale to compose the status for.
 * @returns {string} The composed Mastodon status message.
 */
export const composeMastodonStatusRule = (offersOnSale: Offer[]): string => {
  const parts: string[] = offersOnSale.map(
    (offerOnSale: Offer) =>
      `${offerOnSale.savings?.amount} on ${offerOnSale.name} ${offerOnSale.description}`
  );

  let message = 'Save ';

  for (let i = 0; i < parts.length; i++) {
    const isLastItem: boolean = i === parts.length - 1;
    const isSecondToLastItem: boolean = i === parts.length - 2;

    message += parts[i];

    if (!isLastItem && !isSecondToLastItem) message += ', ';

    if (isSecondToLastItem) message += ' and ';
  }

  return message;
};
