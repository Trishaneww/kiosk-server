const express = require('express');
const knex = require('knex')(require('../knexfile'));
const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const data = await knex('categories')
        res.send(data)
    } catch (err) {
        res.send(err)
    }

})

module.exports = router