// Master seed file to populate the database with some content when it's run

import sequelize from '../config/connections.js';
import { User, Comment } from '../models/index.js';

import userData from './userData.json' assert { type: 'json' };
import commentData from './commentData.json' assert { type: 'json' };

/*// Import database connection from config.js
const sequelize = require('../config/connections');
// Import models
const { User, Comment } = require('../models');

// Import seed data for users and comments
const userData = require('./userData.json');
const commentData = require('./commentData.json');*/

// Function to seed the database
const seedDatabase = async () => {
  // Sync the database and force recreate tables
  await sequelize.sync({ force: true });

  // Bulk create users with individual hooks enabled
  const users = await User.bulkCreate(userData, {
    individualHooks: true, // Ensure hooks like password hashing run for each user
    returning: true, // Return all created user instances
  });

  // Create comments and associate them with random users
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      // Assign each comment a random user_id from the created users
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // Exit the process once seeding is complete
  process.exit(0);
};

// Execute the seed function
seedDatabase();