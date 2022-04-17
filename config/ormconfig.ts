import { ConnectionOptions } from 'typeorm';
import dbConfig from './dbConfig';
import User from '../src/entity/User';
import Dept from '../src/entity/Dept';

const ormconfig: ConnectionOptions = {
  type: 'mysql',
  host: dbConfig.host,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [User, Dept],
  synchronize: true,
  logging: false,
  migrations: ['migration/*.ts'],
  cli: {
    migrationsDir: 'migration',
  },
};

export default ormconfig;
