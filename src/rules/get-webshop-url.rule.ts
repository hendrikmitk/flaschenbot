import { Result } from '../client/flaschenpost.response';

export const getWebshopUrl = (result: Result): string => {
  return `https://www.flaschenpost.de/p/${result.brandWebShopUrl}/${result.webShopUrl}`;
};
