const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

User.hasMany(Post, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  as: "posts",
});

User.hasMany(Comment, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  as: "comments",
});

Post.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  as: "author",
});

Post.hasMany(Comment, {
  foreignKey: "postId",
  onDelete: "CASCADE",
  as: "comments",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
  as: "author",
});

Comment.belongsTo(Post, {
  foreignKey: "postId",
  as: "post",
});
module.exports = {
  User,
  Comment,
  Post,
};
