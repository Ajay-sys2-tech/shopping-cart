import { addToCart as addToCartRepo,
         getCartItemById as getCartItemByIdRepo,
         getCartItems as getCartItemsRepo,
         removeFromCart as removeFromCartRepo,
         checkOut as checkOutRepo
 } from "../repository/cartRepo.js";


 export const getCartitems = async (userId) => {
    try {
        const cartItems = await getCartItemsRepo(userId);
        return cartItems;
    } catch (error) {
        console.log(error);
    }
 }

 export const addToCart = async ( productToBeAdded ) => {
    try {
        const addedToCart = await addToCartRepo(productToBeAdded);
        return addedToCart;
    } catch (error) {
        console.log(error);
    }
 }
//to implement in add to cart, update cart if the product already exists in the cart


 export const removeFromCart = async ( cartItemId ) => {
    try {
        const itemExist = await getCartItemByIdRepo( cartItemId );
        if(!itemExist) {
            return ({error: 'Product not found in cart'});
        } 

        const removedItemFromCart = await removeFromCartRepo(cartItemId);
        return removedItemFromCart; 
    } catch (error) {
        console.log(error);
    }
 }

 export const checkOut = async ( userId ) => {
    try {
        const checkedOut = await checkOutRepo( userId);
        return checkedOut ;
    } catch (error) {
        console.log(error)
    }
 }