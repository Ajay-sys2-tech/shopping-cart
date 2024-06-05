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
            // references: {
            //     model: Product,
            //     key: 'id'
            // }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            //     model: User,
            //     key: 'id'
            // }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
    },
  );

await Cart.sync();
console.log('Cart table synced');

// Cart.belongsTo(User, { foreignKey: 'userId' });
// Cart.belongsTo(Product, { foreignKey: 'productId' });

export default Cart;