const express = require("express");

const Restaurant = require("../models/Restaurant");
const RestaurantService = require("../services/restaurantService");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

module.exports = {
  getAll,
  getById,
  filter,
  create,
  updateById,
  deleteById
}

async function getAll(req, res, next) {
  try {
    var restaurants = await Restaurant.find();
    return res.status(200).send({ restaurants, count: restaurants.length });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

async function getById(req, res, next) {
  var id = req.params.id;
  try {
    var restaurant = await Restaurant.findById(id).populate([ "products" ]);
    return res.status(200).send(restaurant);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

// Create restaurant
async function create(req, res, next) {
  try {
    let restaurant = await RestaurantService.createRestaurant(req.body, req.userId);
    return res.status(200).send(restaurant);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

// Update restaurant
async function updateById(req, res, next) {
  var id = req.params.id;
  try {
    await RestaurantService.checkIfUserIsOwner(id, req.userId);

    var restaurant = await RestaurantService.update(id, req.body);
    return res.status(200).send(restaurant);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

async function deleteById(req, res, next) {
  var id = req.params.id;

  try {
    await RestaurantService.checkIfUserIsOwner(id, req.userId);
    // delete all of the products
    let restaurant = await Restaurant.findByIdAndDelete(id);
    return res.status(200).send({ message: "Restaurant deleted" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

async function filter(req, res, next) {
  try {
    var restaurants = await RestaurantService.filter(req.query);
    return res.status(200).send({ restaurants, count: restaurants.length });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}
