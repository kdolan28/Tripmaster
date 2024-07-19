import User from './User.js';
import Comment from './Comment.js';

// Creates a relationship between User and Comment model, with the User having a "has many" relationship with Comment model.
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Creates a relationship between User and Comment model, with a "belongs to" relationship of the Comment to the User.
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

export { User, Comment };