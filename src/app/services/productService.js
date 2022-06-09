const Product = require("../models/Product");
const Restaurant = require("../models/Restaurant");
const RestaurantService = require("../services/restaurantService");

exports.createProduct = async function (body, restaurantId) {
  try {

    var product = await Product.create({ ...body, restaurant: restaurantId });

    return product;
  } catch (err) {
    throw new Error(err);
  }
}

exports.pushProductToRestaurant = async function (restaurantId, productId) {
  try {
    var restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    restaurant.products.push(productId);
    await restaurant.save();
    return restaurant;
  } catch (err) {
    throw new Error(err);
  }
}

exports.update = async function (id, body, userId) {
  try {
    var product = await Product.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    var restaurantId = product.restaurant;
    var restaurant = await Restaurant.findById(restaurantId);

    if (restaurant.owner.toString() !== userId) {
      throw new Error("You are not the owner of this restaurant");
    }

    var updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });
    return updatedProduct;
  } catch (err) {
    throw new Error(err);
  }
}

exports.delete = async function (id) {
  try {
    var product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }

    await product.remove();
    return product;
  } catch (err) {
    throw new Error(err);
  }
}
