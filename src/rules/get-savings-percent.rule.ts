import { Result } from '../models/inventory.model';

export const getSavingsPercentRule = (result: Result): string =>
  new Intl.NumberFormat('de-DE', {
    style: 'percent',
  }).format(result.articles[0].crossedPrice / result.articles[0].price - 1);
