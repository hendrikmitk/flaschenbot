import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const API_KEY = process.env.API_KEY;

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.header('x-api-key') || req.header('x-api-key') !== API_KEY) {
    return res.status(StatusCodes.UNAUTHORIZED).send({
      code: res.statusCode,
      text: ReasonPhrases.UNAUTHORIZED,
      message: 'Invalid API key',
      data: undefined,
    });
  }

  next();
};
