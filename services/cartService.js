import { addToCart as addToCartRepo,
         getCartItemById as getCartItemByIdRepo,
         getCartItems as getCartItemsRepo,
         removeFromCart as removeFromCartRepo,
         checkOut as checkOutRepo
 } from "../repository/cartRepo.js";
 import { getProduct as getProductRepo } from '../repository/productRepo.js';
import { sendMail } from "../utils/sendMail.js";

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
        const productExist = await getProductRepo(productToBeAdded.productId);
        if(!productExist){
            return ({error: "Product not found"});
        }
        const addedToCart = await addToCartRepo(productToBeAdded);
        if(addedToCart.error){
            return ({error: 'Product not found'});
        }
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

 export const checkOut = async ( userId, userEmail ) => {
    try {
        const checkedOut = await checkOutRepo( userId);
        if(checkedOut > 0) sendMail(userEmail);
        return checkedOut ;
    } catch (error) {
        console.log(error)
    }
 }