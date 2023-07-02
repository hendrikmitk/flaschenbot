import express, { Request, Response, Router } from 'express';

import flaschenpostClient from '../client/flaschenpost.client';
import { getFlaschenpostOffers } from '../functions/get-flaschenpost-offers';
import { getUniqueArticleIds } from '../functions/get-unique-article-ids';

const articles: Router = express.Router();

articles.get('/', (req: Request, res: Response) => {
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
    .getArticles(getUniqueArticleIds(queryParams['id'] as string[] | string))
    .then((response) => {
      return res.status(200).send({
        code: res.statusCode,
        text: 'OK',
        message: undefined,
        data: getFlaschenpostOffers(response.data),
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

export default articles;
