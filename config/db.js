const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "crud",
  password: "Faiz@1234",
  port: 3400,
});

module.exports = pool;
