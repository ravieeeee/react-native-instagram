'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    user_name: DataTypes.STRING,
    image: DataTypes.STRING,
    heart: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};