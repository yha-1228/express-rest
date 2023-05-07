import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import User from '../entity/User';

export type Payload = {
  id: number;
};

export type Decoded = JwtPayload & Payload;

export type VerifiedResponse = Response<unknown, { loggedInUser: User }>;
