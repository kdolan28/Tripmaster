/*// Import important parts of sequelize library
import { Model, DataTypes } from 'sequelize';
// Import the Sequelize connection instance
import sequelize from '../config/connections.js';

// Create Comment model
class Comment extends Model {}

// Initialize Comment model with fields/columns
Comment.init(
  // Define columns
  {
    id: {
      type: DataTypes.INTEGER, // Integer data type for the id
      allowNull: false, // This field cannot be null
      primaryKey: true, // This field is the primary key
      autoIncrement: true, // This field auto-increments
    },
    content: {
      type: DataTypes.TEXT, // Text data type for the content (longer text)
      allowNull: false, // This field cannot be null
    },
    date_created: {
      type: DataTypes.DATE, // Date data type for the creation date
      allowNull: false, // This field cannot be null
      defaultValue: DataTypes.NOW, // Default value is the current date and time
    },
    user_id: {
      type: DataTypes.INTEGER, // Integer data type for the user_id
      references: {
        model: 'user', // Reference to the 'user' model
        key: 'id' // Foreign key refers to the 'id' field of the 'user' model
      },
    },
  },
  {
    // Define model options
    sequelize, // Pass the sequelize instance
    timestamps: false, // Disable automatic createdAt and updatedAt fields
    freezeTableName: true, // Prevent Sequelize from pluralizing table names
    underscored: true, // Use snake_case for column names

    modelName: 'comment', // Define the model name
  }
);

// Export the Comment model for use in other parts of the application
export default Comment*/
