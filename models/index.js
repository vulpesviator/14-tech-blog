/* imports the database Models */
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

/* establishes each User has many Posts */
User.hasMany(Post, {
    foreignKey: 'user_id'
});

/* establishes each Post is owned by a single User */
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});

/* establishes each Comment is owned by a single User */
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});

/* establishes each Comment belongs to a single Post */
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: "CASCADE"
});

/* establishes each User has many Comments */
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});

/* establishes each Post has many Comments */
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: "CASCADE"
});



module.exports = { User, Post, Comment }