const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const userController = require("../controllers/userControlller");
const middleware = require("../middlware/auth");

//................  user api  ..........................
router.post("/register", userController.userCreate);
router.post("/login", userController.login);
router.put("/user/:id", userController.userUpdate);
router.delete("/user/:id", userController.userDelete);
router.get("/user/:id", middleware,userController.findUserById);
//......................... task api ...............................

router.post("/task", middleware, taskController.createtask);
router.get("/task", middleware, taskController.getAlltask);
router.get("/task/user/:userId", middleware, taskController.findTaskByUser);
router.get("/task/:id", middleware, taskController.gettaskById);
router.put("/task/:id", middleware, taskController.updatetaskById);
router.delete("/task/:id", middleware, taskController.deletetaskById);

module.exports = router;
