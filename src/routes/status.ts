import express, { Request, Response, Router } from 'express';

import flaschenpostClient from '../client/flaschenpost.client';
import mastodonClient from '../client/mastodon.client';
import { composeMastodonStatusRule } from '../rules/compose-mastodon-status.rule';
import { getFlaschenpostOffersRule } from '../rules/get-flaschenpost-offers.rule';
import { getUniqueArticleIdsRule } from '../rules/get-unique-article-ids.rule';
import { auth } from '../utils/auth';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const status: Router = express.Router();

status.get('/', auth, async (req: Request, res: Response) => {
  const queryParams = req.query;

  if (!('id' in queryParams)) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
      code: res.statusCode,
      text: ReasonPhrases.UNPROCESSABLE_ENTITY,
      message: "Request must contain an 'id' query parameter",
      data: undefined,
    });
  }

  try {
    const articleIds = getUniqueArticleIdsRule(
      queryParams['id'] as string[] | string
    );
    const response = await flaschenpostClient.getArticles(articleIds);
    const offersOnSale = getFlaschenpostOffersRule(response.data).filter(
      (offer) => offer.onSale
    );

    if (offersOnSale.length === 0) {
      return res.status(StatusCodes.OK).send({
        code: res.statusCode,
        text: ReasonPhrases.OK,
        message: 'No product on sale',
        data: undefined,
      });
    }

    await mastodonClient.postStatus(composeMastodonStatusRule(offersOnSale));

    return res.status(StatusCodes.CREATED).send({
      code: res.statusCode,
      text: ReasonPhrases.CREATED,
      message: undefined,
      data: offersOnSale,
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

export default status;
