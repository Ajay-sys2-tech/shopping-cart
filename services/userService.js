import { getUser, createUser } from "../repository/userRepo.js";
import bcrypt from 'bcrypt';

export const registerUser = async (user) => {
    const { email, password } = user;

    try {
      // Check if the user with the given email already exists
      const existingUser = await getUser(email);
      // console.log(existingUser);
  
      if (existingUser) {
        return ({ error: 'User with this email already exists'});
      }
  
      // Create a new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await createUser({ email, password: hashedPassword });
      return newUser;
  
    } catch (error) {
      console.error('Error in registerUser:', error);
      throw error;
    }
}


export const loginUser = async ( user ) => {
    const { email, password } = user;

    try {
      // Check if the user with the given email already exists
      const existingUser = await getUser(email);
  
      if (!existingUser) {
        return ({ error: 'User does not exist'});
      }
      
      //if user exists compare the passwords
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return ({ error: 'Invalid email or password'});
      }
      
      return existingUser;
  
    } catch (error) {
      console.error('Error in loginUser:', error);
      throw error;
    }
}