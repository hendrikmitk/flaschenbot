import { Result } from '../client/flaschenpost.response';

export const getSavingsPercentRule = (result: Result): string =>
  new Intl.NumberFormat('de-DE', {
    style: 'percent',
  }).format(
    (result.articles[0].price - result.articles[0].offerPrice) /
      result.articles[0].price
  );
