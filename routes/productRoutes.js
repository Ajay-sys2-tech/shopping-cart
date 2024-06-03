import express from 'express';
import { getProduct, getAllProducts, createProduct } from '../services/productService.js';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await getAllProducts();
        console.log(products);
        if( products.length == 0)
            res.status(404).json({error: "No products found"});
        else{
            res.status(200).json(products);
        }
    } catch (error) {
        console.log(error);
    }
});

router.get("/:id", (req, res) => {
    res.send('product with id');
});

router.post("/", async (req, res) => {
    const { title, description, price, imageUrl } = req.body;

    try {
        const newProduct = await createProduct({title, description, price, imageUrl})

        if( newProduct ){
            res.status(201).json({message: 'Product created successfully'});
        }

        else {
            res.status(400).json({error: "Product not created"});
        }
    } catch (error) {   
        console.log(error);
    }
});


router.put("/:id", (req, res) => {
    res.send("This is update products form");
});


router.delete("/:id", (req, res) => {
    res.send("This is delete products form");
});

export default router;