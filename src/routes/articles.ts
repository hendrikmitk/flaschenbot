import express, { Request, Response, Router } from 'express';

import flaschenpostClient from '../client/flaschenpost.client';
import { Inventory, Result } from '../models/inventory.model';
import { Offer } from '../models/offers.model';
import { hasArticleOnSaleRule } from '../rules/has-article-on-sale.rule';
import { getSavingsAmountRule } from '../rules/get-savings-amount.rule';
import { getSavingsPercentRule } from '../rules/get-savings-percent.rule';

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
      const inventory: Inventory = response.data;

      const offers: Offer[] = inventory.results.map((result: Result) => {
        return {
          name: result.name,
          description: result.articles[0].shortDescription,
          price: result.articles[0].crossedPrice,
          onSale: hasArticleOnSaleRule(result),
          savings: hasArticleOnSaleRule(result)
            ? {
                amount: getSavingsAmountRule(result),
                percent: getSavingsPercentRule(result),
              }
            : undefined,
        };
      });

      return res.status(200).send({
        code: res.statusCode,
        text: 'OK',
        message: undefined,
        data: offers,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

export default articles;
