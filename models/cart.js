import { DataTypes, Model } from 'sequelize';
import sq from './db/conn.js';

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
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
    },
  );

  await Cart.sync(() => console.log('Cart table synced'));


export default Cart;