require('dotenv').config();
const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(`${DB_NAME}`, `${DB_USER}`, `${DB_PASS}`, {
  host: DB_HOST,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require("../models/UserModel")(sequelize, Sequelize);
db.activities = require("../models/ActivityModel")(sequelize, Sequelize);

module.exports = db;
