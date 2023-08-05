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

  archivePage(pageId: string) {
    return client.pages.update({ page_id: pageId, archived: true });
  },

  createPage(
    databaseId: string,
    article_name: string,
    flaschenpost_id: number
  ) {
    return client.pages.create({
      parent: {
        type: 'database_id',
        database_id: databaseId,
      },
      properties: {
        article_name: {
          title: [
            {
              text: {
                content: article_name,
              },
            },
          ],
        },
        flaschenpost_id: {
          number: flaschenpost_id,
        },
      },
    });
  },
};
