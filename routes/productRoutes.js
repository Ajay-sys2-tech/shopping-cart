import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
    res.send('All products');
});

router.get("/:id", (req, res) => {
    res.send('product with id');
});

router.post("/", (req, res) => {
    res.send("This is Add products form");
});


router.patch("/:id", (req, res) => {
    res.send("This is update products form");
});


router.delete("/:id", (req, res) => {
    res.send("This is delete products form");
});

export default router;