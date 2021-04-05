const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const dotEnvLocation = path.join(process.mainModule.path, '.env');
dotenv.config({ path: dotEnvLocation })

const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE
});


module.exports = pool;
