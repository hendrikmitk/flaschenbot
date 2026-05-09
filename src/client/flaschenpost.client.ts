import axios from 'axios';

const BASE_URL = 'https://www.flaschenpost.de';
const WAREHOUSE_ID = 28;

export const client = () => {
  const config = {
    baseURL: BASE_URL,
    timeout: 8000,
  };
  return axios.create(config);
};

export default {
  getArticles(articleIds: string[]) {
    return client().get(
      `/php-product-api/v1/products/pdp/warehouse/${WAREHOUSE_ID}`,
      {
        params: { ids: articleIds.join(',') },
      },
    );
  },
};
