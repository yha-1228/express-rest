import { NextFunction, Request, Response } from 'express';
import wrap from './helpers/wrap';

const usersController = {
  findAll: wrap(async (req: Request, res: Response, next: NextFunction) => {
    const ramdomErrorCondition = Math.random() > 0.8;
    if (ramdomErrorCondition) throw new Error('Random error.');

    const users = await Promise.resolve([
      { id: 1, name: 'name 1' },
      { id: 2, name: 'name 2' },
      { id: 3, name: 'name 3' },
    ]);

    res.json(users);
  }),
};

export default usersController;
