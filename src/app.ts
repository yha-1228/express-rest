import 'reflect-metadata';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import corsOptions from '../config/corsOptions';
import usersApiRouter from './routes/api/users';
import notFoundHandler from './middlewares/common/notFoundHandlar';
import errorLogHandlar from './middlewares/common/errorLogHandlar';
import errorResponder from './middlewares/common/errorResponder';
import { baseURL } from './constants';

const app: express.Express = express();

// @ts-ignore 2/28現在ではtypes/nodeを入れるとここが型エラーになる
app.use(express.json());

// @ts-ignore 2/28現在ではtypes/nodeを入れるとここが型エラーになる
app.use(express.urlencoded({ extended: true }));

// @ts-ignore 2/28現在ではtypes/nodeを入れるとここが型エラーになる
app.use(logger('dev'));

app.use(cors(corsOptions));

// API routes
app.use(`${baseURL}/users`, usersApiRouter);
app.use(notFoundHandler);

// Handle error
app.use(errorLogHandlar);
app.use(errorResponder);

export default app;
