//const validate = require('validator');
const DataTypes = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
      isNull: false,
    },
    level: {
      type: Sequelize.STRING,
      isIn: [[0, 1, 2]],
      allowNull: false,
      defaultValue: 1
    },
    created_at: {
      type: DataTypes.DATE,
      isNull: false,
      isDate: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      isDate: true,
    },
    createdAt: {
      type: DataTypes.VIRTUAL
    },
    updatedAt: {
      type: DataTypes.VIRTUAL
    }
  });

  return User;
};