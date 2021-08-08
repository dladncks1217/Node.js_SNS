require('dotenv').config();
module.exports={
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": process.env.DB_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false,
    "logging":true,
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": process.env.DB_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql",
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.SEQUELIZE_PASSWORD,
    "database": process.env.DB_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false,
    "logging":false
  }
}
