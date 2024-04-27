/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('stores', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('location').notNullable();
        table.string('email').notNullable();
        table.string('address').notNullable();
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    })
    .createTable('menues', (table) => {
        table.increments('id').primary();
        table
          .integer('store_id')
          .unsigned()
          .references('stores.id')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.string('title').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    })
    .createTable('categories', (table) => {
        table.increments('id').primary();
        table
            .integer('menu_id')
            .unsigned()
            .references('menues.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.string('title').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    })
    .createTable('orders', (table) => {
        table.increments('id').primary();
        table
          .integer('store_id')
          .unsigned()
          .references('stores.id')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.integer('amount').notNullable();
        table.string('orderid').notNullable();
        table.string('customer').notNullable();
        table.string('payment').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    })
    .createTable('products', (table) => {
        table.increments('id').primary();
        table
            .integer('menu_id')
            .unsigned()
            .references('menues.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.string('productid').notNullable();
        table.integer('price').notNullable();
        table.string('name').notNullable();
        table.string('calories').notNullable();
        table.boolean('status').defaultTo(true);
        table.string('description').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    })
    .createTable('ingredients', (table) => {
        table.increments('id').primary();
        table
            .integer('product_id')
            .unsigned()
            .references('products.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.string('name').notNullable();
        table.boolean('availability').defaultTo(true);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function(knex) {
    return knex.schema.dropTable('ingredients').dropTable('products').dropTable('orders').dropTable('menues').dropTable('restaurants');
};

