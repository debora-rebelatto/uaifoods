const express = require("express");

const AuthController = require('../controllers/authController')

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/authenticate', AuthController.authenticate);
router.delete("/:id", AuthController.delete);

module.exports = app => app.use("/auth", router);