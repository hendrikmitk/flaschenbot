import { Result } from '../models/inventory.model';

export const getSavingsAmountRule = (result: Result): string =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
    result.articles[0].price - result.articles[0].crossedPrice
  );
