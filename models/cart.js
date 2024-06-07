import { DataTypes, Model } from 'sequelize';
import sq from '../db/conn.js';
// import User from './users.js';
// import Product from './products.js';

const Cart = sq.define(
    'Cart',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
    },
  );

await Cart.sync();

export default Cart;