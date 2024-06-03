import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
    res.send('User Cart');
});


router.post("/", (req, res) => {
    res.send("This is Add to cart form");
});


router.patch("/:productId", (req, res) => {
    res.send("This is update products in the cart form");
});


router.delete("/:productId", (req, res) => {
    res.send("This is delete product from the cart");
});

export default router;