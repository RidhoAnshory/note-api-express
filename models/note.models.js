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
  },
  {
    freezeTableName: true,
  },
);

User.hasMany(Note);
Note.belongsTo(User, { foreignKey: 'userId' });

module.exports = Note;
