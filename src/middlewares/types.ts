import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type Decoded = JwtPayload & {
  id: number;
};

export type AuthenticatedUser = {
  id: number;
  email: string;
  password: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
};

export type VerifiedResponse = Response<unknown, { authenticatedUser: AuthenticatedUser }>;
