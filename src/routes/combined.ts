import express, { Request, Response, Router } from 'express';

import flaschenpostClient from '../client/flaschenpost.client';
import mastodonClient from '../client/mastodon.client';
import notionClient from '../client/notion.client';
import { Result } from '../client/notion.response';
import { checkIdsForEquality } from '../functions/check-ids-for-equality';
import { composeMastodonStatusRule } from '../rules/compose-mastodon-status.rule';
import { filterNotionFavoritesRule } from '../rules/filter-notion-favorites.rule';
import { getFavoritesArticleIdsRule } from '../rules/get-favorites-article-ids.rule';
import { getFlaschenpostOffersRule } from '../rules/get-flaschenpost-offers.rule';
import { getNotionFavoritesRule } from '../rules/get-notion-favorites.rule';
import { auth } from '../utils/auth';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const combined: Router = express.Router();

const favoritesDatabaseId = process.env.FAVORITES_DATABASE_ID;
const savedOffersDatabaseId = process.env.SAVED_OFFERS_DATABASE_ID;

combined.get('/', auth, async (req: Request, res: Response) => {
  if (!favoritesDatabaseId || !savedOffersDatabaseId) {
    return res.status(StatusCodes.NOT_FOUND).send({
      code: res.statusCode,
      text: ReasonPhrases.NOT_FOUND,
      message: 'No Notion database ID could be found',
      data: undefined,
    });
  }

  try {
    const favoritesResponse = await notionClient.getDatabase(
      favoritesDatabaseId as string
    );

    const favorites = filterNotionFavoritesRule(
      getNotionFavoritesRule(favoritesResponse.results as Result[])
    );

    if (favorites.length === 0) {
      return res.status(StatusCodes.OK).send({
        code: res.statusCode,
        text: ReasonPhrases.OK,
        message: 'No active favorites in database',
        data: undefined,
      });
    }

    const flaschenpostResponse = await flaschenpostClient.getArticles(
      getFavoritesArticleIdsRule(favorites)
    );

    const currentOffers = getFlaschenpostOffersRule(
      flaschenpostResponse.data
    ).filter((offer) => offer.onSale);

    if (currentOffers.length === 0) {
      return res.status(StatusCodes.OK).send({
        code: res.statusCode,
        text: ReasonPhrases.OK,
        message: 'No products on sale',
        data: undefined,
      });
    }

    const currentOfferIds = currentOffers.map(
      (currentOffer) => currentOffer.id
    );

    const savedOffersResponse = await notionClient.getDatabase(
      savedOffersDatabaseId
    );

    const savedOffers: Result[] = savedOffersResponse.results as Result[];

    const savedOfferIds = savedOffers.map(
      (savedOffer) => savedOffer.properties.flaschenpost_id.number
    );

    if (checkIdsForEquality(currentOfferIds, savedOfferIds)) {
      return res.status(StatusCodes.OK).send({
        code: res.statusCode,
        text: ReasonPhrases.OK,
        message: 'Products on sale have not changed',
        data: undefined,
      });
    }

    for (const savedOffer of savedOffers) {
      await notionClient.archivePage(savedOffer.id);
    }

    currentOffers.forEach((currentOffer) => {
      notionClient.createPage(
        savedOffersDatabaseId,
        currentOffer.name,
        currentOffer.id
      );
    });

    await mastodonClient.postStatus(composeMastodonStatusRule(currentOffers));

    return res.status(StatusCodes.CREATED).send({
      code: res.statusCode,
      text: ReasonPhrases.CREATED,
      message: undefined,
      data: currentOffers,
    });
  } catch (error: Error | unknown) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      code: res.statusCode,
      text: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
      data: undefined,
    });
  }
});

export default combined;
