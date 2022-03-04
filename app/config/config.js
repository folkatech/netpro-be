const dotenv = require('dotenv').config({ encoding: 'latin1' });
module.exports = {
    PORT: process.env.PORT,
    MYSQL_PORT : process.env.MYSQL_PORT,
    HTTPS: process.env.HTTPS_STAT, //
    JWT_SECRET: process.env.JWT_SECRET,
    DB_NAME: process.env.DB_NAME,
    DB_PASS: process.env.DB_PASS,
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    ASSETS: "../../public/img/",
    PUBLIC_DIR: process.env.PUBLIC_DIR,
    URL_WEB: process.env.HTTPS_STAT == 'off' ? process.env.URL_DEV : process.env.URL_LIVE
}
