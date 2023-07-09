const User = require("./User");

User.hasMany(BlogPost, {
    foreignKey: "user_id", 
    onDelete: "CASCADE",
});

module.exports = { User }