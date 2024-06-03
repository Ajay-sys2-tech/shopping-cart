import { DataTypes, Model } from 'sequelize';
import sq from './db/conn.js';

const User = sq.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
  );

  await User.sync(() => console.log('User table synced'));


export default User;