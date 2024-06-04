import express from 'express';
import { registerAdmin, loginAdmin } from '../services/adminService.js';
import jwt from 'jsonwebtoken';
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
        }

        const admin = await registerAdmin({email, password, isAdmin: true});
    
        if(admin.error) {
            res.status(400).json(admin);
        }

        else{
            res.status(201).json({message: "Super Admin created succesfully!"});
        }
        
    } catch (error) {
        console.log(error);
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
        const loggedInAdmin = await loginAdmin({email, password});
        
        if(loggedInAdmin.error) {
            res.status(400).json(loggedInAdmin);
        }

        else{
            const token = jwt.sign({
                id: loggedInAdmin.id,
                email: loggedInAdmin.email,
            }, process.env.JWT_ADMIN_SECRET);
            console.log(token);
            res.status(200).json({
                token: token,
                message: `Welcome ${loggedInAdmin.email}`
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