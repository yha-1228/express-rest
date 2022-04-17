import { NextFunction, Request, Response } from 'express';
import wrap from './helpers/wrap';
import { getRepository } from 'typeorm';
import User from '../../entity/User';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import jwtConfig from '../../../config/jwtConfig';
import { Payload, VerifiedResponse } from '../types';

type UserCreateDto = { username: string; email: string; password: string };

type LoginReqBody = { email: string; password: string };

type UserCreateRequest = Request<unknown, unknown, UserCreateDto>;

type LoginRequest = Request<unknown, unknown, LoginReqBody>;

const mapUserToResponse = (user: User) => {
  const { password, ...rest } = user;
  return rest;
};

const generateToken = (payload: Payload) => {
  return jwt.sign(payload, jwtConfig.secretOrPrivateKey, {
    algorithm: 'HS256',
    expiresIn: jwtConfig.expiresIn,
  });
};

const usersController = {
  findAll: wrap(async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      relations: ['dept'],
    });

    res.json(users.map(mapUserToResponse));
  }),

  create: wrap(async (req: UserCreateRequest, res: Response, next: NextFunction) => {
    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.username = req.body.username;

    const userRepository = getRepository(User);
    const createdUser = await userRepository.save(user);

    res.json(createdUser);
  }),

  login: wrap(async (req: LoginRequest, res: Response, next: NextFunction) => {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ email: req.body.email });
    if (!user) throw createHttpError(404, `Not Found:email=${req.body.email}`);

    const matchedPassword = user.password === req.body.password;
    if (!matchedPassword) throw createHttpError(401);

    const payload = { id: user.id };

    res.json({ token: generateToken(payload) });
  }),

  refreshToken: wrap(async (req: Request, res: VerifiedResponse, next: NextFunction) => {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(res.locals.loggedInUser.id);
    if (!user) throw createHttpError(404, `Not Found:id=${res.locals.loggedInUser.id}`);

    const payload = { id: user.id };

    res.json({ token: generateToken(payload) });
  }),
};

export default usersController;
