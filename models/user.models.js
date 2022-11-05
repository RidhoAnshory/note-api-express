const db = require('../config/db.config');
const Sequelize = require('sequelize');

const { DataTypes } = Sequelize;
const User = db.define(
  'user',
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  },
);
db.sync()
  .then(() => {
    console.log('Book table created successfully!');
  })
  .catch((error) => {
    console.error('Unable to create table : ', error);
  });

module.exports = User;
