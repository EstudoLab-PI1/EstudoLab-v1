const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',       
    host: 'localhost',         
    database: 'pi1-estudolab',    
    password: 'postgres',     
    port: 5432,                
});

module.exports = pool;
