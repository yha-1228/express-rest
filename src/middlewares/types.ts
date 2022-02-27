import { JwtPayload } from 'jsonwebtoken';

export type Decoded = JwtPayload & {
  id: number;
};
