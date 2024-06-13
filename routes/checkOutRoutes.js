import express from 'express';
import { addAddress, getAddress, checkOut } from '../services/checkOutService.js';
import { addressValidator } from '../middlewares/validators.js';
import {validationResult} from 'express-validator';
import { verifyUser } from '../middlewares/userAuth.js';

const router = express.Router();

router.get("/", verifyUser, async (req, res) => {
    try {
        const userId = req.user.id;
        if(!userId){
            res.status(401).json({error: "Unauthorised"});
            return;
        }

        const userAddress = await getAddress( userId );
        
        res.status(200).json({
            city: userAddress.city,
            state: userAddress.state,
            pinCode: userAddress.pinCode,
            phone: userAddress.phone
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'Unexpected error'});
    }
});


router.post("/", addressValidator, verifyUser, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()});
        return;
    }
    
    try {
        const userId = req.user.id;
        if(!userId){
            res.status(401).json({error: "Unauthorised"});
            return;
        }
        const { city, state, pinCode, phone } = req.body;
        const newAddress = await addAddress(userId, { city, state, pinCode, phone });
        if(newAddress){
            res.status(200).json({message: 'Address added succesfully'});
        }
        else{
            res.status(400).json({error: 'Something went wrong, try again'});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'Unexpected error'});
    }
});


router.delete("/", verifyUser, async (req, res) => {
   
    try {
        const userId = req.user.id;
        if(!userId){
            res.status(401).json({error: "Unauthorised"});
            return;
        }

        const checkedOut = await checkOut( userId, req.user.email );
        if(checkedOut.error){
            res.status(400).json({error: "Please add the address"});
            return;
        }
        if(checkedOut > 0){
            res.status(200).json({message: "Order placed successfully"});
        }
        else{
            res.status(400).json({error: "Order not placed, please try again"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});



router.get('/*', (req, res) => {
    res.send("Page not Found!");
});

export default router;

