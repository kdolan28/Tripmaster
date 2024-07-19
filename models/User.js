/*/ Import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// Import bcrypt for password hashing
const bcrypt = require('bcrypt');
// Import database connection from config.js
const sequelize = require('../config/connections');*/

// Import important parts of sequelize library
import { Model, DataTypes } from 'sequelize';
// Import bcrypt for password hashing
import { compareSync, hash } from 'bcrypt';
// Import database connection from config.js
import sequelize from '../config/connections.js';

// Create User model
class User extends Model {
  // Method to check the password on login
  checkPassword(loginPw) {
    // Compare the provided password with the hashed password stored in the database
    return compareSync(loginPw, this.password);
  }
}

// Create fields/columns for User model
User.init(
  {
    // Define columns
    id: {
      // Use the special Sequelize DataTypes object to provide what type of data it is (Integer)
      type: DataTypes.INTEGER,
      // Doesn't allow null values
      allowNull: false,
      // Instruct that this is the Primary Key
      primaryKey: true, 
      // Turn on auto increment
      autoIncrement: true,
    },
    name: {
      // Use the special Sequelize DataTypes object to provide what type of data it is (String)
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // Prevents duplicate email addresses in database
      unique: true,
      // Checks for email format (foo@bar.com)
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      // Prevents null values
      allowNull: false,
      // Will only allow alphanumeric characters
      validate: {
        isAlphanumeric: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // Must be longer than 8 characters
      validate: {
        len: [8],
      },
    },
  },
  {
    // Hooks are used so that if a user is created or updated, the password is encrypted before being stored in the database.
    hooks: {
      // Before a new user is created, hash the password
      beforeCreate: async (newUserData) => {
        newUserData.password = await hash(newUserData.password, 10);
        return newUserData;
      },
      // Before an existing user is updated, hash the password
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    // Pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // Don't add timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // Don't pluralize name of database table
    freezeTableName: true,
    // Use snake_case (spaces replaced with underscores) for column names instead of camelCase
    underscored: true,
    // Define model name
    modelName: 'user',
  }
);

// Export the User model
/*module.exports = User;*/
export default User;
