'use strict';
module.exports = (sequelize, DataTypes) => {
  var LikeLog = sequelize.define('LikeLog', {
    liker_id: DataTypes.INTEGER,
    liker_name: DataTypes.STRING,
    owner_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {});
  LikeLog.associate = function(models) {
    // associations can be defined here
  };
  return LikeLog;
};