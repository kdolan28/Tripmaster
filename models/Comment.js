/*// Import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// Import database connection from config.js
const sequelize = require('../config/connections');*/

// Import important parts of sequelize library
import { Model, DataTypes } from 'sequelize';
// Import database connection from config.js
import sequelize from '../config/connections.js';

// Create Comment model
class Comment extends Model {}

// Initialize Comment model with fields/columns
Comment.init(
  // Define columns
  {
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
    content: {
      // Use the special Sequelize DataTypes object to provide what type of data it is (String)
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_created: {
      // Use the special Sequelize DataTypes object to provide what type of data it is (Date)
      type: DataTypes.DATE,
      allowNull: false,
      // Set default value to current date and time
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      // Reference the User model
      references: {
        // Model to reference
        model: 'user',
        // Key in the referenced model
        key: 'id'
      },
    },
  },
  {
    // Pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // Don't add timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // Don't pluralize name of database table
    freezeTableName: true,
    // Use snake_case (spaces replaced with underscores) for column names instead of camelCase
    underscored: true,
    // Define model name
    modelName: 'comment',
  }
);

// Export the Comment model
/*module.exports = Comment;*/
export default Comment;
