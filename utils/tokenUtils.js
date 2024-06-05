import jwt from 'jsonwebtoken';
import { saveToken, deleteToken } from '../repository/userRepo.js';
import 'dotenv/config';

export const createUserToken = async (user) => {
    try{
        const token = jwt.sign({
            id: user.id,
            email: user.email,
        }, process.env.JWT_USER_SECRET);
    
        await saveToken(user.id, token);
        return token;
    }catch(error){
        console.log(error);
        throw error;
    }
};

export const deleteUserToken = async ( id ) => {
    try {
        await deleteToken(id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}



export const createAdminToken = async (admin) => {
    try{
        const token = jwt.sign({
            id: admin.id,
            email: admin.email,
        }, process.env.JWT_ADMIN_SECRET);
    
        await saveToken(admin.id, token);
        return token;
    }catch(error){
        console.log(error);
        throw error;
    }
};

export const deleteAdminToken = async ( id ) => {
    try {
        await deleteToken(id);
    } catch (error) {
        console.log(error);
        throw error;
    }
}