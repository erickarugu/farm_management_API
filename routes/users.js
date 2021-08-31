const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();
exports.router = (() => {
  // Create a new User
  userRouter.post("/", userController.createUser);
  userRouter.get("/", userController.findAllUsers); // userful for admins anly
  userRouter.post("/user", userController.findUserByEmail);
  userRouter.get("/:id", userController.findUser);
  userRouter.put("/:id", userController.updateUser);
  userRouter.delete("/:id", userController.deleteUser);
  return userRouter;
})();