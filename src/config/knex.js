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
        min: 2,
        max: 6,
        propagateCreateError: false,
        idleTimeoutMillis: 30000,
        createTimeoutMillis: 3000,
        acquireTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 100
    }
};
