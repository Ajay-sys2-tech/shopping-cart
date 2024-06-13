import express from 'express';
import { getCartitems, addToCart, removeFromCart, checkOut } from '../services/cartService.js';
import { verifyUser } from '../middlewares/userAuth.js';
import { createCartValidator } from '../middlewares/validators.js'
import {validationResult} from 'express-validator';

const router = express.Router();

router.get("/", verifyUser, async (req, res) => {
    
    try {
        const userId = req.user.id;
        if(!userId){
            res.status(401).json({error: "Unauthorised"});
            return;
        }

        const cartItems = await getCartitems(userId);
        if(cartItems.length == 0){
             res.status(404).json({error: "No products found in your cart."});
        }
        else{
            res.status(200).json(cartItems);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});


router.post("/", createCartValidator, verifyUser, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()})
        return;
    }
    
    try {
        const userId = req.user.id;
        if(!userId){
            res.status(401).json({error: "Unauthorised"});
            return;
        }

        const { productId, quantity } = req.body;
        console.log(productId);
        if((!(productId || quantity ))|| quantity < 1){
            res.status(400).json({error: 'No product or quantity selected'});
            return;
        }
        
        const addedItemInCart = await addToCart({ userId, productId, quantity});

        if(addedItemInCart.error){
            res.status(400).json({error: 'Product not found'});
        }

        else{
            res.status(201).json({message: 'Product added to cart successfully'});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});


router.patch("/:productId", (req, res) => {
    res.send("This is update products in the cart form");
});


router.delete("/checkout", verifyUser, async (req, res) => {
   
    try {
        const userId = req.user.id;
        if(!userId){
            res.status(401).json({error: "Unauthorised"});
            return;
        }

        const checkedOut = await checkOut( userId, req.user.email );
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
})



router.delete("/:cartItemId", verifyUser, async (req, res) => {
    const cartItemId = req.params.cartItemId;

    try {
        const removedItem = await removeFromCart(cartItemId);

        if(removedItem.error){
            res.status(400).json({error: "Product not found in the cart"});
        }
        else{
            return res.status(200).json({message: "Product successfully removed"});
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