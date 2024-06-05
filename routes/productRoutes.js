import express from 'express';
import { getProduct, getAllProducts, createProduct, updateProduct, deleteProduct } from '../services/productService.js';
import { verifyAdmin } from '../middlewares/adminAuth.js';
import { createProductValidator } from '../middlewares/validators.js';
import {validationResult} from 'express-validator'

const router = express.Router();

//to get all the products
router.get("/", async (req, res) => {
    try {
        const products = await getAllProducts();
        if( products.length == 0)
            res.status(404).json({error: "No products found"});
        else{
            res.status(200).json(products);
        }
    } catch (error) {
        console.log(error);
    }
});


//to get a single product by its id
router.get("/:id", async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await getProduct(productId);

        if(product.error){
            res.status(404).json({error: "Product not found"});
        }
        else{
            res.status(200).json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});


//to create a new product
router.post("/", verifyAdmin, createProductValidator, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(422).json({errors: errors.array()})
        return;
    }

    try {
        const { title, description, price, imageUrl } = req.body;
        const newProduct = await createProduct({title, description, price, imageUrl})

        if( newProduct ){
            res.status(201).json({message: 'Product created successfully'});
        }

        else {
            res.status(400).json({error: "Product not created, please adhere to the product creation rules"});
        }
    } catch (error) {   
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});


router.patch("/:id", verifyAdmin, async (req, res) => {
    const productIdToUpdate = req.params.id;
    const bodyValues = req.body;
    const updatedValues = {};

    const fieldsToCopy = ['title', 'description', 'price', 'imageUrl'];

    fieldsToCopy.forEach(field => {
    if (bodyValues[field] !== undefined && bodyValues[field] !== null) {
        updatedValues[field] = bodyValues[field];
    }
    });

    try {
        const updatedProduct = await updateProduct(productIdToUpdate, updatedValues);

        if(updatedProduct.error) {
            res.status(404).json({error: "Product not found"});
        }
        else{
            res.status(200).json({message: "Product updated successfully"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});


router.delete("/:id", verifyAdmin,   async (req, res) => {
    const productIdToDelete = req.params.id;

    try {
        const deletedProduct = await deleteProduct(productIdToDelete);

        if(deletedProduct.error) {
            res.status(404).json({error: "Product not found"});
        }
        else if(deletedProduct > 0){
            res.status(200).json({message: "Product deleted successfully"});
        }
        else{
            //need to ask vivek
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