
exports.up = function(knex) {
   return knex.schema
   .createTable('user', user => {
    user.increments('user_id');
    user.string('username', 12).notNullable().unique();
    user.string('password', 256).notNullable();
   })
   .createTable('field_map', map => {
      map.increments('field_map_id');
      for(let x = 0; x !== 100; x++){
         let index = x.toString()
         if(index.length === 1){
            index = '0' + index
         }
         map.boolean(index)
      }
   })
   .createTable('match', match => {
      match.increments('match_id');

      match.integer('defender_user_id').references('user_id').inTable('user');
      match.integer('defender_shots').references('field_map_id').inTable('field_map');
      match.integer('defender_ships').references('field_map_id').inTable('field_map');

      match.integer('challenger_user_id').references('user_id').inTable('user');
      match.integer('challenger_shots').references('field_map_id').inTable('field_map');
      match.integer('challenger_ships').references('field_map_id').inTable('field_map');

      match.integer('winner').references('user_id').inTable('user')
   })
   .createTable('invite', match => {
      match.increments('invite_id');

      match.integer('challenger_user_id').references('user_id').inTable('user');

      match.integer('defender_user_id').references('user_id').inTable('user');
   })
  
};

exports.down = function(knex) {
   return knex.schema
   .dropTableIfExists('invite')
   .dropTableIfExists('match')
   .dropTableIfExists('field_map')
   .dropTableIfExists('user');
};
