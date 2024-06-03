import Product from '../models/products.js';

export const getProduct = async ( id ) => {
    try {
        const product = await Product.findOne({ where: { id } });
        return product;
    } catch (error) {
        console.log(error);
    }
};


export const getAllProducts = async () => {
    try {
        const products = await Product.findAll();
        return products;
    } catch (error) {
        console.log(error);
    }
};


export const createProduct = async (product) => {
    try {
        const newProduct = await Product.create( product );
        return newProduct.dataValues;
    } catch (error) {
        console.log(error);
    }

};



export const updateProduct = async (id) => {
    try {
        
    } catch (error) {
        console.log(error);
    }

};


export const deleteProduct = async (id) => {
    try {
        
    } catch (error) {
        console.log(error);
    }

}