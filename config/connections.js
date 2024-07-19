/*const Sequelize = require('sequelize');
require('dotenv').config();*/

import Sequelize from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres'
    }
  );
}

export default sequelize;