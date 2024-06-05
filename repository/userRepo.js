import User from '../models/users.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const getUser = async ( email ) => {
    try {
        const user = await User.findOne({ where: { email } });
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const getUserById = async ( id ) => {
    try {
        const user = await User.findOne({ where: { id } });
        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


export const createUser = async (user) => {
    try {
        const newUser = await User.create( user );
        return newUser.dataValues;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getAdminUser = async ( ) => {
    try {
        const admin = await User.findOne({ where: { isAdmin: true } });
        return admin;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const saveToken = async (id, token) => {
    try {
        const tokenSaved = await User.update({ token }, { where: { id } });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteToken = async (id) => {
    try {
        const tokenDeleted = await User.update({ token: null }, { where: { id } });
    } catch (error) {
        console.log(error);
        throw error;
    }
    
}

export const getUserByToken = async (token, email) => {
    try {
        const decode = jwt.verify(token, process.env.JWT_USER_SECRET);
        if(decode.email !== email){
            return ({error: 'Invalid token'});
        }
        
        const userFound = await User.findOne({ where: {id: decode.id, token, email}});
        return userFound;
    } catch (error) {
        console.log(error);
        throw error;
    }
};