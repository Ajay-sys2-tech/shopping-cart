import express from 'express';
import jwt from 'jsonwebtoken';
import { registerUser, loginUser, isLoggedIn } from '../services/userService.js';
import { emailPasswordValidator } from '../middlewares/validators.js';
import {validationResult} from 'express-validator';
import { createUserToken, deleteUserToken } from '../utils/tokenUtils.js';
import { verifyUser } from '../middlewares/userAuth.js';



const router = express.Router();

router.post("/register", emailPasswordValidator, async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }
    
    try {
        const { email, password, confirmPassword } = req.body;
        if(password !== confirmPassword) {
            res.status(400).json({ error: 'Password and Confirm password should match!' });
            return;
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
        res.status(400).json({error: 'Unexpected error'});
    }
});

router.post("/login", emailPasswordValidator, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()})
        return;
    }
    
    try {
        const token = req.cookies.user_token;
        const { email, password } = req.body;

        if(token && isLoggedIn(token, email)){
            return res.status(400).json({error: 'User already logged in or illegal token'});
        }
        const loggedInUser = await loginUser({email, password});
        
        if(loggedInUser.error) {
            res.status(400).json({error: loggedInUser.error});
        }

        else{
            const token = await createUserToken(loggedInUser);
    
            res.status(200).cookie('user_token', token).json({
                message: `Welcome ${loggedInUser.email}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'Unexpected error'});
    }
});


router.get("/logout", verifyUser, async (req, res) => {
    await deleteUserToken(req.user.id);
    return res.clearCookie("user_token").status(200).json({message: 'User logged out'});
});


router.get('/*', (req, res) => {
    res.send("Page not Found!");
});
export default router;