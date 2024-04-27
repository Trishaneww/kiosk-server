/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const restaurantData = require('../seeds-data/restaurants');
const categoryData = require('../seeds-data/categories');
const menuData = require('../seeds-data/menues');
const productData = require('../seeds-data/products');

exports.seed = async function(knex) {
    await knex('stores').del();
    await knex('categories').del();
    await knex('menues').del();
    await knex('products').del();
    await knex('stores').insert(restaurantData);
    await knex('categories').insert(categoryData);
    await knex('menues').insert(menuData);
    await knex('products').insert(productData);
} 