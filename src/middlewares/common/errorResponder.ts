import { Request, Response, NextFunction } from 'express';
import createHttpError, { HttpError } from 'http-errors';

const errorResponder = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
  if (res.headersSent) {
    return next(err);
  }

  if (createHttpError.isHttpError(err)) {
    res
      .status(err.statusCode)
      .send({ exception: { message: err.statusCode >= 500 ? 'Server error' : err.message } });
  } else if (err instanceof Error) {
    res.status(500).send({ exception: { message: 'Server error.' } });
  } else {
    res.status(500).send({ exception: 'Server error.' });
  }
};

export default errorResponder;
