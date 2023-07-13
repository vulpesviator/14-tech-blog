const Sequelize = require('sequelize');
/* uses .env file to connect with database parameters */
require('dotenv').config();

let sequelize;

/* Uses the JAWSDB MySQL add-on when deployed on Heroku */
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  /* Otherwise it connects with local database if user has setup the .env file */
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
