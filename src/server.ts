import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import ormconfig from '../config/ormconfig';
import app from './app';

dotenv.config();

const port = process.env.PORT || 8888;

app.listen(port, () => {
  createConnection(ormconfig).catch((err) => {
    console.log('Database connection err.');
  });

  console.log(`App listening on port ${port}`);
});
