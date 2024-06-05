import express from 'express';
import jwt from 'jsonwebtoken';
import { registerUser, loginUser } from '../services/userService.js';
import { emailPasswordValidator } from '../middlewares/validators.js';
import {validationResult} from 'express-validator'



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
        const { email, password } = req.body;
        const loggedInUser = await loginUser({email, password});
        
        if(loggedInUser.error) {
            res.status(400).json(loggedInUser);
        }

        else{
            const token = jwt.sign({
                id: loggedInUser.id,
                email: loggedInUser.email,
            }, process.env.JWT_USER_SECRET);
            console.log(token);
            res.status(200).json({
                token: token,
                message: `Welcome ${loggedInUser.email}`
            });
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/*', (req, res) => {
    res.send("Page not Found!");
});
export default router;