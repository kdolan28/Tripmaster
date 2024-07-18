// Import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
// Import database connection from config.js
const sequelize = require('../config/connection');

// Create User model
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
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
      // Prevents duplicate email addresses in DB
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
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    // Pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    timestamps: false,
    // Don't pluralize name of database table
    freezeTableName: true,
    underscored: true,
    // Define model name
    modelName: 'user',
  }
);

module.exports = User;
