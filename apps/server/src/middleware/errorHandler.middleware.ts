import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/api.error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
      success: false,
    });
  }
  return res.status(500).json({
    statusCode: 500,
    message: 'Internal Server Error',
    errors: err.message,
    success: false,
  });
};
