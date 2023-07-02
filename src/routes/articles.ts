import express, { Request, Response, Router } from 'express';

import flaschenpostClient from '../client/flaschenpost.client';
import { getFlaschenpostOffers } from '../functions/get-flaschenpost-offers';

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

  const idQueryParams = queryParams['id'];

  const articleIds: string[] = [];

  if (Array.isArray(idQueryParams)) {
    idQueryParams.forEach((param) => {
      articleIds.push(param.toString());
    });
  } else if (typeof idQueryParams === 'string') {
    articleIds.push(idQueryParams);
  }

  const uniqueArticleIds: string[] = [...new Set(articleIds)];

  flaschenpostClient
    .getArticles(uniqueArticleIds)
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
