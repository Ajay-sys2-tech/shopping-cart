import { getProduct as getProductRepo, 
        getAllProducts as getAllProductsRepo, 
        createProduct as createProductRepo,
        updateProduct as updateProductRepo,
        deleteProduct as deleteProductRepo } from "../repository/productRepo.js";


export const getProduct = async ( id ) => {
    try {
        const product = await getProductRepo( id );

        if( !product ){
            return ({ error: "Product not found" });
        }
        
        return product;
    } catch (error) {
        console.log(error);
    }
};


export const getAllProducts = async ( ) => {
    try {
        const products = await getAllProductsRepo();
        return products;
    } catch (error) {
        console.log(error);
    }
};


export const createProduct =  async ( product ) => {
    try {
        const newProduct = await createProductRepo(product);
        return newProduct;
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async ( productIdToUpdate, updatedValues ) => {
    try {
        const productExists = await getProduct(productIdToUpdate);
        console.log(productExists);
        if(productExists.error){
            return ({ error: "Product not found" });
        }

        const updatedProduct = await updateProductRepo(productIdToUpdate, updatedValues);
        return updatedProduct;
    } 
    catch (error) {
        console.log(error);
    }   
}

export const deleteProduct = async ( productIdToDelete ) => {
    try {
        const productExists = await getProduct(productIdToDelete);
        if(productExists.error){
            return ({ error: "Product not found" });
        }

        const deletedProduct = await deleteProductRepo(productIdToDelete);
        return deletedProduct;
        
    } catch(error) {    
        console.log(error);
    }
}