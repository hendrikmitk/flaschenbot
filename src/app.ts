import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import articles from './routes/articles';
import combined from './routes/combined';
import favorites from './routes/favorites';
import status from './routes/status';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

dotenv.config();

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send({
    code: res.statusCode,
    text: ReasonPhrases.OK,
    message: undefined,
    data: undefined,
  });
});

app.use('/articles', articles);
app.use('/combined', combined);
app.use('/favorites', favorites);
app.use('/status', status);

export default app;
