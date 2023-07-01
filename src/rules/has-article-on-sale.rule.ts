import { Result } from '../models/inventory.model';

export const hasArticleOnSaleRule = (result: Result): boolean =>
  result.articles[0].crossedPrice < result.articles[0].price;
