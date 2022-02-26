import { Request, Response, NextFunction } from 'express';

const errorLogHandlar = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    console.error(err.stack);
  }

  next(err);
};

export default errorLogHandlar;
