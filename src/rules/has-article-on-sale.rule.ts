import { Result } from '../client/flaschenpost.response';

export const hasArticleOnSaleRule = (result: Result): boolean =>
  result.articles[0].crossedPrice < result.articles[0].price;
