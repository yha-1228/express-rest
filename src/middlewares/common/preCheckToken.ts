import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import jwtConfig from '../../../config/jwtConfig';
import User from '../../entity/User';
import { createUserNotFoundError } from '../../errors';
import { Decoded } from '../types';

const preCheckToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'];

  if (typeof token !== 'string') {
    return next(createHttpError(401, "Please set req.headers['x-access-token']"));
  }

  jwt.verify(token, jwtConfig.secretOrPrivateKey, (err, decoded) => {
    if (decoded) {
      const { id } = <Decoded>decoded;
      const userRepository = getRepository(User);

      userRepository
        .findOne(id)
        .then((user) => {
          if (!user) {
            return next(createUserNotFoundError(id));
          }

          res.locals.loggedInUser = user;
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
