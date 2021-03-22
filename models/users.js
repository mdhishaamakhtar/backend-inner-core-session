const sequelize = require('sequelize');
const db = require('../database/connection');

const schema = {
  userId: {
    type: sequelize.UUID,
    primaryKey: true
  },
  username: {
    type: sequelize.STRING(255)
  },
  password: {
    type: sequelize.STRING(255)
  }
}

const options = {
  timestamps: false
}

const User = db.define('Users', schema, options);

User.sync({alter: true})
  .then(() => {
    console.log('Users Migration Made');
  })
  .catch(err => {
    console.log('An Error Occurred:' + err);
  });

module.exports = User;