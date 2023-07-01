import express, { Express } from 'express';
import dotenv from 'dotenv';

import articles from './routes/articles';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use('/articles', articles);

app.listen(port, () => {
  console.log(`[SERVER] Server is running at http://localhost:${port}`);
});
