const express = require("express");

const Product = require("../models/Product");
const ProductService = require("../services/productService");
const RestaurantService = require("../services/restaurantService");

const authMiddleware = require("../middlewares/authMiddleware");
const Restaurant = require("../models/Restaurant");

const router = express.Router();

router.use(authMiddleware);

// get all products
exports.getAll = async function (req, res, next) {
  try {
    var products = await Product.find();
    return res.status(200).send(products);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

// get product by id
exports.getById = async function (req, res, next) {
  var id = req.params.id;
  try {
    var product = await Product.findById(id);
    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

// create product
exports.create = async function (req, res, next) {
  try {

    await RestaurantService.checkIfRestaurantExists(req.params.id)

    // create product
    let product = await ProductService.createProduct(req.body, req.params.id);

    // push product id to restaurant
    await ProductService.pushProductToRestaurant(req.params.id, product._id);

    var newProduct = await product.save();
    return res.status(200).send(newProduct);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

// update product
exports.update = async function (req, res, next) {
  var id = req.params.id;
  try {
    var product = await ProductService.update(id, req.body, req.userId);
    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

// delete product
exports.delete = async function (req, res, next) {
  var id = req.params.id;
  try {
    var product = await ProductService.delete(id);
    return res.status(200).send("Product deleted");
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}
