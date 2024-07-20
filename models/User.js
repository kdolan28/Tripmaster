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
// Import Sequelize database connection instance
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
      type: DataTypes.INTEGER, // Integer data type for the id
      allowNull: false, // This field cannot be null
      primaryKey: true,  // This field is the primary key
      autoIncrement: true, // This field auto-increments
    },
    name: {
      type: DataTypes.STRING, // String data type for the name
      allowNull: false, // This field cannot be null
    },
    email: {
      type: DataTypes.STRING, // String data type for the email
      allowNull: false, // This field cannot be null
      unique: true, // This field must be unique (prevents duplicate usernames in database)
      validate: {
        isEmail: true, // Validate that the email is in the email format (foo@bar.com)
      },
    },
    username: {
      type: DataTypes.STRING, // String data type for the username
      allowNull: false, // This field cannot be null
      unique: true, // This field must be unique (prevents duplicate usernames in database)
      validate: {
        isAlphanumeric: true, // Validate that the username only has alphanumeric characters
      },
    },
    password: {
      type: DataTypes.STRING, // String data type for the password
      allowNull: false, // This field cannot be null
      validate: {
        len: [8], // Validate that the password is at least 8 characters long
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
    // Define model options
    sequelize, // Pass the sequelize instance
    timestamps: false, // Disable automatic createdAt and updatedAt fields
    freezeTableName: true, // Prevent Sequelize from pluralizing table names
    underscored: true, // Use snake_case for column names
    modelName: 'user', // Define the model name
  }
);

// Export the User model for use in other parts of the application
/*module.exports = User;*/
export default User;
