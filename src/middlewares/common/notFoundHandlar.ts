import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  next(createError(404, `Route: ${req.route} - not found.`));
};

export default notFoundHandler;
