import { getAdminUser, createUser } from "../repository/userRepo.js";
import bcrypt from 'bcrypt';

export const registerAdmin = async (admin) => {
    const { email, password, isAdmin } = admin;

    try {
      // Check if the user with the given email already exists
      const existingAdmin = await getAdminUser();
      // console.log(existingUser);
  
      if (existingAdmin) {
        return ({ error: 'Admin already exists, cannot create more than one'});
      }
  
      // Create a new admin
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await createUser({ email, password: hashedPassword, isAdmin: isAdmin });
      return newAdmin;
  
    } catch (error) {
      console.log('Error in registerAdmin:', error);
      throw error;
    }
}


export const loginAdmin = async ( admin ) => {
    const { email, password } = admin;

    try {
      // Check if the user with the given email already exists
      const existingAdmin = await getAdminUser();
  
      if (!existingAdmin || existingAdmin.email !== email) {
        return ({ error: 'Invalid email or password'});
      }
      
      //if user exists compare the passwords
      const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);
      if (!isPasswordValid) {
        return ({ error: 'Invalid email or password'});
      }
      
      return existingAdmin;
  
    } catch (error) {
      console.log('Error in loginAdmin:', error);
      throw error;
    }
}