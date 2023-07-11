import { Client } from '@notionhq/client';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({ auth: process.env.NOTION_API_TOKEN });

export default {
  getDatabase(databaseId: string) {
    return client.databases.query({
      database_id: databaseId,
    });
  },

  getPage(pageId: string) {
    return client.pages.retrieve({ page_id: pageId });
  },
};
