import express from 'express';
import { registerAdmin, loginAdmin } from '../services/adminService.js';
import jwt from 'jsonwebtoken';
import { emailPasswordValidator } from '../middlewares/validators.js';
import {validationResult} from 'express-validator';
import { createAdminToken, deleteAdminToken } from '../utils/tokenUtils.js';
import { verifyAdmin } from '../middlewares/adminAuth.js';


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
            return res.status(400).json({ error: 'Password and Confirm password should match!' });
        }

        const admin = await registerAdmin({email, password, isAdmin: true});
    
        if(admin.error) {
            res.status(400).json({error: admin.error});
        }

        else{
            res.status(201).json({message: "Super Admin created succesfully!"});
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
        const token = req.cookies.admin_token;
        if(token && isLoggedIn(token)){
            return res.status(400).json({error: 'Already logged in!'});
        }
        const { email, password } = req.body;
        const loggedInAdmin = await loginAdmin({email, password});
        
        if(loggedInAdmin.error) {
            res.status(400).json(loggedInAdmin);
        }

        else{
            const token = await createAdminToken(loggedInAdmin);
            res.status(200).cookie('admin_token', token).json({
                message: `Welcome ${loggedInAdmin.email}`
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'Unexpected error'});
    }
});


router.get("/logout", verifyAdmin, async (req, res) => {
    await deleteAdminToken(req.admin.id);
    return res.clearCookie("admin_token").status(200).json({message: 'Admin logged out'});
});



router.get('/*', (req, res) => {
    res.send("Page not Found!");
});

export default router;