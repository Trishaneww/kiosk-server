const express = require('express');
const knex = require('knex')(require('../knexfile'));
const router = express.Router();
const axios = require('axios');

router.get('/:id', async(req,res) => {
    try {
        const data = await knex('cart')
        .where({ store_id: req.params.id })
        res.send(data)
    } catch (err) {
        res.send(err)
    }
})

router.post('/', async(req,res) => {
    try {
        const data = await knex.insert(req.body).into('cart');

        //retreiving new cart item
        const newCartId = data[0];
        const newCart = await knex('cart')
            .where({ id:newCartId });
        console.log(newCart);

    } catch (err) {
        res
            .status(500)
            .send({ message: `unable to add a new cartitem: ${err}`})
    }
})


router.delete('/', async(req,res) => {
    try {
        const deletedCart = await knex('cart')
            .where({ id:req.params.id })
            .delete();

        if (deletedCart === 0) {
            return res
                .status(404)
                .send({ message: `product with ID ${req.params.id} not found`})
        }
    } catch (err) {
        res
            .status(500)
            .send({ message: `unable to delete cart item: ${err}`})
    }
})

module.exports = router
