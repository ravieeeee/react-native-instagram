'use strict';

module.exports = (sequelize, DataTypes) => {
  const OAuthToken = sequelize.define('OAuthToken', {
    accessToken: DataTypes.STRING,
    expiresAt: DataTypes.DATE,
    scope: DataTypes.STRING,
    clientId: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  OAuthToken.associate = function(models) {
  };
  return OAuthToken;
};