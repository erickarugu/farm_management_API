//const validate = require('validator');
const DataTypes = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  const Activity = sequelize.define('activities', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_assigned: {
      type: Sequelize.UUID,
      allowNull: false,
      allowNull: false,
      unique: false,
    },
    manager_id: {
      type: Sequelize.UUID,
      allowNull: false,
      allowNull: false,
      unique: false,
    },
    image_url: {
      type: DataTypes.STRING,
      isNull: false,
    },
    status: {
      type: Sequelize.STRING,
      isIn: [[0, 1, 2]],
      allowNull: false,
      defaultValue: 0
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

  return Activity;
};