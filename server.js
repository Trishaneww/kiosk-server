const express = require('express');
const app = express();
const cors = require("cors");
const PORT = 3307;

app.use(cors());
  
require("dotenv").config();
app.use(express.json());

const orderRoute = require('./routes/Orders');
const productRoute = require('./routes/Products');
const categoryRoute = require('./routes/Categories');
app.use("/orders", orderRoute);
app.use("/products", productRoute);
app.use("/categories", categoryRoute);


app.get('/', (req, res) => {
    console.log('Hello World!')
})

app.listen(3307, () => {
    console.log(`listening on port ${PORT}`)
})