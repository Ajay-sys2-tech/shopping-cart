import { getAddress as getAddressRepo, 
        addAddress as addAddressRepo,
        checkOut as checkOutRepo } from "../repository/checkOutRepo.js";
import { sendMail } from "../utils/sendMail.js";

export const addAddress = async (userId, address) => {
    try {
        const newAddress = await addAddressRepo(userId, address);
        return newAddress;
    } catch (error) {
        console.error('Error in adding shipping address:', error);
        throw error;
    }
};

export const getAddress = async (userId) => {
    try {
        const userAddress = await getAddressRepo( userId );
        return userAddress;
    } catch (error) {
        console.error('Error in fetching user address:', error);
        throw error;
    }
};


export const checkOut = async ( userId, userEmail ) => {
    try {
        const checkedOut = await checkOutRepo( userId);
        if(checkedOut > 0) {
            sendMail(userEmail);
            return checkedOut ;
        }
    } catch (error) {
        console.log(error)
    }
 }