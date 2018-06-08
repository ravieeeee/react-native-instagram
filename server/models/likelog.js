'use strict';
module.exports = (sequelize, DataTypes) => {
  var LikeLog = sequelize.define('LikeLog', {
    like_name: DataTypes.STRING,
    owner_id: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {});
  LikeLog.associate = function(models) {
    // associations can be defined here
  };
  return LikeLog;
};