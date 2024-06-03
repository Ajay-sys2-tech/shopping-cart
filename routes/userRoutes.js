import express from 'express';

const router = express.Router();

router.post("/register", (req, res) => {
    res.send('User Register');
});

router.post("/login", (req, res) => {
    res.send("User login");
});

export default router;