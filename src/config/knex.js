/* ONLY FOR MIGRATIONS AND SEEDS */
const {join} = require('path');
require('dotenv').config({
    path: join(__dirname, '.env')
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

module.exports = {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    },
    pool: {
        min: 10,
        max: 80,
        propagateCreateError: false,
        idleTimeoutMillis: 30000,
        createTimeoutMillis: 10000,
        acquireTimeoutMillis: 10000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 1000
    }
};
