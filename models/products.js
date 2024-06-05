import { DataTypes, Model } from 'sequelize';
import sq from '../db/conn.js';
// import Cart from './cart.js';

const Product = sq.define(
    'Product',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
  );

await Product.sync();
console.log('Product table synced');
// Product.hasMany(Cart, { foreignKey: 'productId' });
export default Product;