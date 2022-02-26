import { CorsOptions } from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const corsOptions: CorsOptions = {
  origin: process.env.ORIGIN,
};

export default corsOptions;
