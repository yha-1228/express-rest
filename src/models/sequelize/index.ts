import { Sequelize } from 'sequelize';
import config from '../../../config/database';

if (!config.database) throw new Error('Invalid config: database not found');
if (!config.user) throw new Error('Invalid config: user not found');
if (!config.password) throw new Error('Invalid config: password not found');

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
});

export default sequelize;
