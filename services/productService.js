import { getProduct as getProductRepo, 
        getAllProducts as getAllProductsRepo, 
        createProduct as createProductRepo } from "../repository/productRepo.js";


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

        // if( products.length == 0 ){
        //     return ({ error: "Database has no product" });
        // }
        
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