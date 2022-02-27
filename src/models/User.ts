import { DataTypes } from '@sequelize/core';
import sequelize from './sequelize';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default User;
