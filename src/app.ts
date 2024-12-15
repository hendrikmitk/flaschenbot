import express, { Express } from 'express';
import dotenv from 'dotenv';

import articles from './routes/articles';
import combined from './routes/combined';
import favorites from './routes/favorites';
import status from './routes/status';

dotenv.config();

const app: Express = express();

app.use('/articles', articles);
app.use('/combined', combined);
app.use('/favorites', favorites);
app.use('/status', status);

export default app;
