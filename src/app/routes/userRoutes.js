const express = require("express");

const UserController = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware")
const router = express.Router()

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);

module.exports = app => app.use("/user", router);