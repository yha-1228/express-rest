import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const usersValidator = {
  create: [
    body('username').isLength({ min: 1, max: 100 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 20 }),
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
