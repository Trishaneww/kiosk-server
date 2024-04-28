const express = require('express');
const knex = require('knex')(require('../knexfile'));
const router = express.Router();

router.get('/:id', async(req, res) => {
    try {
        const data = await knex('orders')
        .where({ store_id: req.params.id })
        res.send(data)
    } catch {
        res.send(err)
    }

})