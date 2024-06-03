import express from 'express';
import { registerUser, loginUser } from '../services/userService.js';

const router = express.Router();

router.post("/register", async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    try {
        if(password !== confirmPassword) {
            res.status(400).json({ error: 'Password and Confirm password should match!' });
        }

        const user = await registerUser({email, password});
    
        if(user.error) {
            res.status(400).json(user);
        }

        else{
            res.status(201).json({message: "User added succesfully!"});
        }
        
    } catch (error) {
        console.log(error);
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const loggedInUser = await loginUser({email, password});
        if(loggedInUser.error) {
            res.status(400).json(loggedInUser);
        }

        else{
            res.status(200).json({message: `Welcome ${loggedInUser.email}`});
        }
    } catch (error) {
        console.log(error);
    }
});

export default router;