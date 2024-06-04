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
        return products.map((product) => {
            return product.dataValues;
        });
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



export const updateProduct = async (productIdToUpdate, updatedValues) => {
    try {
        const updatedProduct = await Product.update(updatedValues, {
            where: {
              id: productIdToUpdate
            }
          });

          return updatedProduct;
    } catch (error) {
        console.log(error);
    }

};


export const deleteProduct = async (productIdToDelete) => {
    try {
        const deletedProduct = await Product.destroy({
            where: {
              id: productIdToDelete
            }
        });

        return deletedProduct;
      
    } catch (error) {
        console.log(error);
    }

}

