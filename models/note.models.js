const db = require('../config/db.config');
const Sequelize = require('sequelize');
const User = require('./user.models');

const { DataTypes } = Sequelize;
const Note = db.define(
  'note',
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: 7,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    userId: {
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
User.hasMany(Note);
Note.belongsTo(User, { foreignKey: 'userId' });

module.exports = Note;
