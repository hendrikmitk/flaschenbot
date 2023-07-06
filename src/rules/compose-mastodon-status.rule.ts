import { Offer } from '../models/offers.model';

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
