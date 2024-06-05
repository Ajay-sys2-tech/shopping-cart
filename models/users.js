import { DataTypes, Model } from 'sequelize';
import sq from '../db/conn.js';

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
            isEmail: true,  
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },

        city: {
            type: DataTypes.STRING,
            allowNull: true
        },

        state: {
            type: DataTypes.STRING,
            allowNull: true
        },

        pinCode: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
  );

  await User.sync();
  console.log('User table synced')


export default User;