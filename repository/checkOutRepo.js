import User from '../models/users.js';
import Cart from '../models/cart.js'

export const getAddress = async ( id ) => {
    try {
        const user = await User.findOne({ where: { id } });
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};



export const addAddress = async (userId, address) => {
    try {
        const { city, state, pinCode, phone } = address;
        const newAddress = await User.update( 
            {city, state, pinCode, phone}, {
                where: {
                    id: userId
                }
            }

         );
        return newAddress;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


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
