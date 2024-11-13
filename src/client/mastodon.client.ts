import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://mstdn.social';
const TOKEN = process.env.MASTODON_TOKEN;

export const client = () => {
  const config = {
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${TOKEN}` },
  };
  return axios.create(config);
};

export default {
  postStatus(toot: string) {
    return client().post(
      `/api/v1/statuses`,
      {},
      {
        params: { status: toot },
      }
    );
  },
};
