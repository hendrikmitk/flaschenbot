import { Result } from '../client/flaschenpost.response';

export const getSavingsPercentRule = (result: Result): string =>
  new Intl.NumberFormat('de-DE', {
    style: 'percent',
  }).format(result.articles[0].crossedPrice / result.articles[0].price - 1);
