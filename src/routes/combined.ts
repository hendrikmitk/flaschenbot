import express, { Request, Response, Router } from 'express';

import flaschenpostClient from '../client/flaschenpost.client';
import mastodonClient from '../client/mastodon.client';
import notionClient from '../client/notion.client';
import { Favorite } from '../models/favorite.model';
import { Offer } from '../models/offers.model';
import { composeMastodonStatusRule } from '../rules/compose-mastodon-status.rule';
import { getFavoritesArticleIdsRule } from '../rules/get-favorites-article-ids.rule';
import { getFlaschenpostOffersRule } from '../rules/get-flaschenpost-offers.rule';
import { getNotionFavoritesRule } from '../rules/get-notion-favorites.rule';
import { auth } from '../utils/auth';

const combined: Router = express.Router();

export const databaseId = process.env.NOTION_DATABASE_ID;

combined.get('/', auth, (req: Request, res: Response) => {
  if (!databaseId) {
    return res.status(500).send({
      code: res.statusCode,
      text: 'Internal Server Error',
      message: 'No Notion database ID could be found',
      data: undefined,
    });
  }

  notionClient
    .getDatabase(databaseId)
    .then((response) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const results: Result[] = response.results;

      const favorites: Favorite[] = getNotionFavoritesRule(results);

      flaschenpostClient
        .getArticles(getFavoritesArticleIdsRule(favorites))
        .then((response) => {
          const offersOnSale: Offer[] = getFlaschenpostOffersRule(
            response.data
          ).filter((offer: Offer) => offer.onSale);

          if (offersOnSale.length === 0)
            return res.status(200).send({
              code: res.statusCode,
              text: 'OK',
              message: 'No product on sale',
              data: undefined,
            });

          mastodonClient
            .postStatus(composeMastodonStatusRule(offersOnSale))
            .then(() => {
              return res.status(201).send({
                code: res.statusCode,
                text: 'Created',
                message: undefined,
                data: offersOnSale,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

export default combined;
