import { NextFunction, Request, Response } from 'express';
import { query, validationResult } from 'express-validator';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

/**
 * Middleware to handle validation results from express-validator.
 * Returns a 422 Unprocessable Entity response if validation fails.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
      code: StatusCodes.UNPROCESSABLE_ENTITY,
      text: ReasonPhrases.UNPROCESSABLE_ENTITY,
      message: 'Validation failed',
      data: result.array(),
    });
  }

  next();
};

/**
 * Validation chain for article ID query parameter.
 * Validates that 'id' exists, is not empty, and is numeric.
 */
export const validateArticleId = [
  query('id')
    .exists()
    .withMessage("Request must contain an 'id' query parameter")
    .notEmpty()
    .withMessage("'id' query parameter must not be empty")
    .isNumeric()
    .withMessage("'id' query parameter must be numeric"),
  handleValidationErrors,
];
