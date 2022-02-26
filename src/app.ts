import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import corsOptions from '../config/corsOptions';
import usersApiRouter from './routes/api/users';
import notFoundHandler from './middlewares/common/notFoundHandlar';
import errorLogHandlar from './middlewares/common/errorLogHandlar';
import errorResponder from './middlewares/common/errorResponder';

const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cors(corsOptions));

// API routes
app.use('/api/users', usersApiRouter);
app.use(notFoundHandler);

// Handle error
app.use(errorLogHandlar);
app.use(errorResponder);

export default app;
