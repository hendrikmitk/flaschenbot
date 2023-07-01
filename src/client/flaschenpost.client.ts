import axios from 'axios';

const getUrl = (baseUrl: string, warehouseId: number): string => {
  return `${baseUrl}/elastic-query-portal/${warehouseId}`;
};

const BASE_URL = 'https://www.flaschenpost.de';
const WAREHOUSE_ID = 28;

const URL = getUrl(BASE_URL, WAREHOUSE_ID);

export const client = () => {
  const config = {
    baseURL: URL,
  };
  return axios.create(config);
};

export default {
  getArticles(articleIds: string[]) {
    return client().get(`/v1/articles`, {
      params: { list: JSON.stringify(articleIds) },
    });
  },
};
