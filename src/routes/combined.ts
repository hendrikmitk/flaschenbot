import express, { Request, Response, Router } from 'express';

import flaschenpostClient from '../client/flaschenpost.client';
import mastodonClient from '../client/mastodon.client';
import notionClient from '../client/notion.client';
import { Result } from '../client/notion.response';
import { checkIdsForEquality } from '../functions/check-ids-for-equality';
import { Favorite } from '../models/favorite.model';
import { Offer } from '../models/offers.model';
import { composeMastodonStatusRule } from '../rules/compose-mastodon-status.rule';
import { filterNotionFavoritesRule } from '../rules/filter-notion-favorites.rule';
import { getFavoritesArticleIdsRule } from '../rules/get-favorites-article-ids.rule';
import { getFlaschenpostOffersRule } from '../rules/get-flaschenpost-offers.rule';
import { getNotionFavoritesRule } from '../rules/get-notion-favorites.rule';
import { auth } from '../utils/auth';

const combined: Router = express.Router();

const favoritesDatabaseId = process.env.FAVORITES_DATABASE_ID;
const savedOffersDatabaseId = process.env.SAVED_OFFERS_DATABASE_ID;

combined.get('/', auth, (req: Request, res: Response) => {
  if (!favoritesDatabaseId || !savedOffersDatabaseId) {
    return res.status(500).send({
      code: res.statusCode,
      text: 'Internal Server Error',
      message: 'No Notion database ID could be found',
      data: undefined,
    });
  }

  notionClient
    .getDatabase(favoritesDatabaseId)
    .then((response) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const results: Result[] = response.results;

      const favorites: Favorite[] = filterNotionFavoritesRule(
        getNotionFavoritesRule(results)
      );

      if (favorites.length === 0)
        return res.status(200).send({
          code: res.statusCode,
          text: 'OK',
          message: 'No active favorites in database',
          data: undefined,
        });

      flaschenpostClient
        .getArticles(getFavoritesArticleIdsRule(favorites))
        .then((response) => {
          const currentOffers: Offer[] = getFlaschenpostOffersRule(
            response.data
          ).filter((offer: Offer) => offer.onSale);

          if (currentOffers.length === 0)
            return res.status(200).send({
              code: res.statusCode,
              text: 'OK',
              message: 'No products on sale',
              data: undefined,
            });

          const currentOfferIds: number[] = currentOffers.map(
            (currentOffer: Offer) => currentOffer.id
          );

          notionClient
            .getDatabase(savedOffersDatabaseId)
            .then((response) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              const savedOffers: Result[] = response.results;

              const savedOfferIds: number[] = savedOffers.map(
                (savedOffer: Result) =>
                  savedOffer.properties.flaschenpost_id.number
              );

              if (checkIdsForEquality(currentOfferIds, savedOfferIds)) {
                return res.status(200).send({
                  code: res.statusCode,
                  text: 'OK',
                  message: 'Products on sale have not changed',
                  data: undefined,
                });
              }

              savedOffers.forEach((savedOffer: Result) => {
                notionClient.archivePage(savedOffer.id).catch((error) => {
                  console.log(error);
                });
              });

              currentOffers.forEach((currentOffer: Offer) => {
                notionClient.createPage(
                  savedOffersDatabaseId,
                  currentOffer.name,
                  currentOffer.id
                );
              });

              mastodonClient
                .postStatus(composeMastodonStatusRule(currentOffers))
                .then(() => {
                  return res.status(201).send({
                    code: res.statusCode,
                    text: 'Created',
                    message: undefined,
                    data: currentOffers,
                  });
                })
                .catch((error) => {
                  return res.status(500).send({
                    code: res.statusCode,
                    text: 'Internal Server Error',
                    message: 'Failed to post status to Mastodon',
                    data: error,
                  });
                });
            })
            .catch((error) => {
              return res.status(500).send({
                code: res.statusCode,
                text: 'Internal Server Error',
                message: 'Failed to load saved offers from Notion',
                data: error,
              });
            });
        })
        .catch((error) => {
          return res.status(500).send({
            code: res.statusCode,
            text: 'Internal Server Error',
            message: 'Failed to load articles from flaschenpost',
            data: error,
          });
        });
    })
    .catch((error) => {
      return res.status(500).send({
        code: res.statusCode,
        text: 'Internal Server Error',
        message: 'Failed to load favorites from Notion',
        data: error,
      });
    });
});

export default combined;
