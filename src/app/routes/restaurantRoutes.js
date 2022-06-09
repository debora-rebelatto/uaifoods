const express = require("express");

const RestaurantController = require("../controllers/restaurantController")

const authMiddleware = require("../middlewares/authMiddleware")
const router = express.Router()

router.get("/", RestaurantController.getAll);
router.get("/:id", RestaurantController.getById);
router.post("/", authMiddleware, RestaurantController.create);
router.put("/:id", authMiddleware, RestaurantController.update);
router.delete("/:id", authMiddleware, RestaurantController.delete);

module.exports = app => app.use("/restaurant", router);