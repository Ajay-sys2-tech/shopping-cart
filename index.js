import express from "express"; 
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import bodyParser from 'body-parser';

import './db/conn.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.get('/home', (req, res) => {
    res.send("Welcome Home!");
})

app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);




app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})