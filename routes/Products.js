const express = require('express');
const knex = require('knex')(require('../knexfile'));
const router = express.Router();
const axios = require('axios');

router.get('/:id', async(req, res) => {
    try {
        const data = await knex('products')
        .where({ menu_id: req.params.id })
        res.send(data)
    } catch (err) {
        res.send(err)
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
            .send({ message: `unable to create new product: ${err}`});
    }
})

router.put('/:id', async(req,res) => {
    const updates = req.body;

    try {
        const updatedProductId = await knex('products')
            .where({ id: req.params.id})
            .update(updates);

        if (updatedProductId) {
            const updatedProduct = await knex('products').where({ id:updatedProductId });
            res.status(200).json(updatedProduct)
        } else {
            res
                .status(404)
                .json({ message: `Product with id ${id} does not exist`});
        }

    } catch (err) {
        res
            .status(404)
            .json({ message: `error updating this product. Ran into error: ${err}`})
    }
})


router.delete('/:id', async(req,res) => {
    try {
        const deletedProduct = await knex('products')
            .where({ id: req.params.id })
            .delete();

        if (deletedProduct == 0) {
            return res
                .status(404)
                .json({ message: `product with ID ${req.params.id} not found`});
        }

        // No Content response
        res.sendStatus(204);
    } catch (err) {
        res.status(500).json({
            message: `unable to delete warehouse: ${err}`
        });
    }
})


module.exports = router