import express, { Request, Response, Router } from 'express';

import flaschenpostClient from '../client/flaschenpost.client';
import mastodonClient from '../client/mastodon.client';
import { Offer } from '../models/offers.model';
import { composeMastodonStatusRule } from '../rules/compose-mastodon-status.rule';
import { getFlaschenpostOffersRule } from '../rules/get-flaschenpost-offers.rule';
import { getUniqueArticleIdsRule } from '../rules/get-unique-article-ids.rule';
import { auth } from '../utils/auth';

const status: Router = express.Router();

status.get('/', auth, (req: Request, res: Response) => {
  const queryParams = req.query;

  if (!('id' in queryParams)) {
    return res.status(422).send({
      code: res.statusCode,
      text: 'Unprocessable Content',
      message: "Request must contain an 'id' query parameter",
      data: undefined,
    });
  }

  flaschenpostClient
    .getArticles(
      getUniqueArticleIdsRule(queryParams['id'] as string[] | string)
    )
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
});

export default status;
