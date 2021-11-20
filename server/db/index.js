const { Pool } = require("pg");

// It automatically fetch .env data and use them
const pool = new Pool();

module.exports = {
    query: (text, params) => pool.query(text, params),
};