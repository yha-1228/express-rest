import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import jwtConfig from '../../../config/jwtConfig';
import User from '../../entity/User';
import { AuthenticatedUser, Decoded } from '../types';

const preCheckToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'];

  if (typeof token !== 'string') {
    return next(createHttpError(401, "Please set req.headers['x-access-token']"));
  }

  jwt.verify(token, jwtConfig.secretOrPrivateKey, (err, decoded) => {
    if (decoded) {
      const { id } = decoded as Decoded;
      const userRepository = getRepository(User);

      userRepository
        .findOne(id)
        .then((user) => {
          if (!user) {
            return next(createHttpError(401, `Not found user`));
          }

          const authenticatedUser: AuthenticatedUser = {
            id: user.id,
            email: user.email,
            password: user.password,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };

          res.locals.authenticatedUser = authenticatedUser;
          next();
        })
        .catch(next);
    }

    if (err) {
      return next(createHttpError(401, err));
    }
  });
};

export default preCheckToken;
