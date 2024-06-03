import User from '../models/users.js';

export const getUser = async ( email ) => {
    try {
        const user = await User.findOne({ where: { email } });
        return user;
    } catch (error) {
        console.log(error);
    }
};


export const createUser = async (user) => {
    try {
        const newUser = await User.create( user );
        return newUser.dataValues;
    } catch (error) {
        console.log(error);
    }

}