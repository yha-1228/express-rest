import { ConnectionOptions } from 'typeorm';
import dbConfig from './dbConfig';
import User from '../src/entity/User';

const ormconfig: ConnectionOptions = {
  type: 'mysql',
  host: dbConfig.host,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [User],
  synchronize: true,
  logging: false,
};

export default ormconfig;
