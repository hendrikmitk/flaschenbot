import express, { Express } from 'express';
import dotenv from 'dotenv';

import articles from './routes/articles';
import favorites from './routes/favorites';
import status from './routes/status';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use('/articles', articles);
app.use('/favorites', favorites);
app.use('/status', status);

app.listen(port, () => {
  console.log(`[SERVER] Server is running at http://localhost:${port}`);
});
