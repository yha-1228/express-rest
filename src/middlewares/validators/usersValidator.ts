import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const usersValidator = {
  create: [
    body('name').isLength({ min: 1, max: 100 }),
    body('age').isInt({ min: 0, max: 120 }),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      next();
    },
  ],
};

export default usersValidator;
