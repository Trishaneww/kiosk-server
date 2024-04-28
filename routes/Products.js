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

module.exports = router