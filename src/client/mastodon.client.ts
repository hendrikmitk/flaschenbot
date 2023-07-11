import axios from 'axios';

const BASE_URL = 'https://botsin.space';

export const client = () => {
  const config = {
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${process.env.MASTODON_TOKEN}` },
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
