import Cart from '../models/cart.js';

export const getCartItems = async (userId) => {
    try {
        const cartItems = await Cart.findAll({ where: { userId } });
        console.log(cartItems);
        return cartItems;
    } catch (error) {
        console.log(error);
    }
}

export const getCartItemById = async (cartItemId) => {
    try {
        const cartItem = await Cart.findOne({ where: { id: cartItemId } });
        return cartItem;
    } catch (error) {
        console.log(error);
    }
}

export const addToCart = async (productToBeAdded) => {
    try {
        const addedToCart = await Cart.create( productToBeAdded );
        return addedToCart.dataValues;
    } catch (error) {
        console.log(error);
    }
}

export const removeFromCart = async (cartItemId) => {
    try{
        const removedFromCart = await Cart.destroy({
            where: {
                id: cartItemId
            }
        });

        return removedFromCart;
            
    } catch(error){
        console.log(error);
    }
}

export const checkOut = async (userId) => {
    try {
        const cartCheckedOut = await Cart.destroy({
            where: {
                userId
            }
        });

        return cartCheckedOut;
    } catch (error) {
        console.log(error);
    }
}
