/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('restaurants', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('location').notNullable();
        table.string('password').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    })
    .createTable('menues', (table) => {
        table.increments('id').primary();
        table
          .integer('resteraunt_id')
          .unsigned()
          .references('restaurant.id')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.string('name').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    })
    .createTable('items', (table) => {
        table.increments('id').primary();
        table
            .integer('menu_id')
            .unsigned()
            .references('restaurant.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.string('name').notNullable();
        table.boolean('availability').defaultTo(true);
        table.string('description').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    })
    .createTable('ingredients', (table) => {
        table.increments('id').primary();
        table
            .integer('item_id')
            .unsigned()
            .references('menu.id')
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
    return knex.schema.dropTable('ingredients').dropTable('items').dropTable('menues').dropTable('restaurants');
};
