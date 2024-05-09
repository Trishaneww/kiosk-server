const express = require('express');
const knex = require('knex')(require('../knexfile'));
const router = express.Router();

router.get('/:id', async(req, res) => {
    try {
        const data = await knex('orders')
        .where({ store_id: req.params.id })
        res.send(data)
    } catch (err) {
        res.send(err)
    }
})

router.post('/:id', async(req,res) => {
    try {
        const data = await knex.insert(req.body).into('orders');
        //retrieving new order
        const newOrderId = data[0];
        const newOrder = await knex('orders').where({ id: newOrderId });
        console.log(newOrder);

    } catch (err) {
        res.status(500)
        .send({ message: `unable to create new order. ${err}`})
    }
})

router.post('/', async(req,res) => {
    try {
        const data = await knex.insert(req.body).into('products');
        // Retrieving new product
        const newProductID = data[0];
        const newProduct = await knex('products')
            .where({ id: newProductID});
        console.log(newProduct);

    } catch (err) {
        res
            .status(500)
            .send({ message: `unable to create new deck: ${err}`});
    }
})

module.exports = router