const express = require("express");

const Product = require("../models/Product");
const ProductService = require("../services/productService");
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
    var products = await Product.find();
    // return produts and count
    return res.status(200).send({ products, count: products.length });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

async function getById(req, res, next) {
  var id = req.params.id;
  try {
    var product = await Product.findById(id);

    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

async function filter(req, res, next) {
  try {
    var query = req.query;

    var products = await ProductService.filter(query);
    return res.status(200).send({ products, count: products.length });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

async function create(req, res, next) {
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

async function updateById(req, res, next) {
  var id = req.params.id;
  try {
    var product = await ProductService.update(id, req.body, req.userId);
    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}

async function deleteById(req, res, next) {
  var id = req.params.id;
  try {
    var product = await ProductService.delete(id);
    return res.status(200).send("Product deleted");
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}
