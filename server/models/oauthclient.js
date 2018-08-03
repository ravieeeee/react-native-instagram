'use strict';

module.exports = (sequelize, DataTypes) => {
  const OAuthClient = sequelize.define('OAuthClient', {
    clientId: DataTypes.STRING,
    clientSecret: DataTypes.STRING,
    redirectUri: DataTypes.STRING
  }, {});
  
  return OAuthClient;
};