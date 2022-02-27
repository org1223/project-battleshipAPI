// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

/*                      old line for SQLite3
const sharedConfig = {
  pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) },
} ...sharedCongfig
*/


module.exports = {

  

  development: {
    client: 'pg',
    migrations: { directory: __dirname + '/data/migrations' },
    connection: {
      host:     'localhost',
      port:     '5432',
      database: 'battleship_db',
      user:     'postgres',
      password: 'waylay'
    },

  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },

  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },

  }

};
