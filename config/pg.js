// setup postgres connection
const { Pool } = require('pg');

const pool = new Pool({
  user: 'neondb_owner',
  host: 'ep-raspy-rain-a1t1ypwk-pooler.ap-southeast-1.aws.neon.tech',
  database: 'todos',
  password: 'npg_t6HGBzbEsMI4',
  port: 5432,
  ssl: true
});

module.exports = pool;