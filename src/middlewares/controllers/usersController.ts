/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import User from '../../models/User';
import wrap from './helpers/wrap';
import jwt from 'jsonwebtoken';
import jwtConfig from '../../../config/jwt';

type CreateUserDto = { name: string; email: string; password: string };

type LoginOptions = { email: string; password: string };

type CreateUserRequest = Request<unknown, unknown, CreateUserDto>;

type LoginUserRequest = Request<unknown, unknown, LoginOptions>;

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
    const createUserDto = req.body;
    const user = await User.create(createUserDto);
    res.json(user);
  }),

  login: wrap(async (req: LoginUserRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) throw createHttpError(404, `Not Found:email=${email})`);

    // @ts-ignore
    const matchedPassword = user.password === password;

    if (!matchedPassword) throw createHttpError(401);

    // @ts-ignore
    const payload = { id: user.id as string };

    const createdToken = jwt.sign(payload, jwtConfig.secretOrPrivateKey, {
      algorithm: 'HS256',
      expiresIn: jwtConfig.expiresIn,
    });

    res.json({ token: createdToken });
  }),
};

export default usersController;
