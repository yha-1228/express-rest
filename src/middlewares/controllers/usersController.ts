import { NextFunction, Request, Response } from 'express';
import wrap from './helpers/wrap';
import { getRepository } from 'typeorm';
import User from '../../entity/User';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import jwtConfig from '../../../config/jwtConfig';

type CreateUserDto = { username: string; email: string; password: string };

type LoginOptions = { email: string; password: string };

type CreateUserRequest = Request<unknown, unknown, CreateUserDto>;

type LoginUserRequest = Request<unknown, unknown, LoginOptions>;

const usersController = {
  findAll: wrap(async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find();

    res.json(users);
  }),

  create: wrap(async (req: CreateUserRequest, res: Response, next: NextFunction) => {
    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.username = req.body.username;

    const userRepository = getRepository(User);
    const createdUser = await userRepository.save(user);

    res.json(createdUser);
  }),

  login: wrap(async (req: LoginUserRequest, res: Response, next: NextFunction) => {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ email: req.body.email });
    if (!user) throw createHttpError(404, `Not Found:email=${req.body.email}`);

    const matchedPassword = user.password === req.body.password;
    if (!matchedPassword) throw createHttpError(401);

    const payload = { id: user.id };

    const createdToken = jwt.sign(payload, jwtConfig.secretOrPrivateKey, {
      algorithm: 'HS256',
      expiresIn: jwtConfig.expiresIn,
    });

    res.json({ token: createdToken });
  }),
};

export default usersController;
