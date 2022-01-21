
exports.up = function(knex) {
   return knex.schema.createTable('users', users => {
    users.increments();
    users.string('username', 50).notNullable().unique();
   })
  
};

exports.down = function(knex) {
   return knex.schema.dropTableIfExists('users');
};
