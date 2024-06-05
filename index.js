import express from "express"; 
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkOutRoutes from "./routes/checkOutRoutes.js";
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";

import './db/conn.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Welcome Home!");
});

app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/admin", adminRoutes);
app.use("/checkout", checkOutRoutes);

app.get('/*', (req, res) => {
    res.send("Page not Found!");
})



app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
})