import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import User from '../../models/User';
import wrap from './helpers/wrap';

type CreateUserDto = { name: string; age: number };

type CreateUserRequest = Request<unknown, unknown, CreateUserDto>;

const usersController = {
  findAll: wrap(async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.findAll();
    res.json(users);
  }),

  findOneById: wrap(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) throw createHttpError(404, `Not Found:user id (${userId})`);

    res.json(user);
  }),

  create: wrap(async (req: CreateUserRequest, res: Response, next: NextFunction) => {
    const createUserDto = { name: req.body.name, age: req.body.age };
    const user = await User.create(createUserDto);
    res.json(user);
  }),
};

export default usersController;
