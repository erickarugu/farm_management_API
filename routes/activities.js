const express = require("express");
const activityController = require("../controllers/activityController");
const activityRouter = express.Router();
exports.router = (() => {
  activityRouter.post("/", activityController.createActivity);
  return activityRouter;
})();
