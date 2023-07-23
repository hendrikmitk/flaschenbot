import { NextFunction, Request, Response } from 'express';

const API_KEY = process.env.API_KEY;

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.header('x-api-key') || req.header('x-api-key') !== API_KEY) {
    return res.status(401).send({
      code: res.statusCode,
      text: 'Unauthorized',
      message: 'Invalid API key',
      data: undefined,
    });
  }

  next();
};
