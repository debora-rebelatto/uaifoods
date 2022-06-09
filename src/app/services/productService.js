const Product = require("../models/Product");
const Restaurant = require("../models/Restaurant");

exports.createProduct = async function (body) {
  try {
    var product = await Product.create({ ...body });
    return product;
  } catch (err) {
    throw new Error(err);
  }
}

exports.pushProductToRestaurant = async function (restaurantId, productId) {
  try {
    console.log(restaurantId, productId);
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

exports.update = async function (id, body) {
  try {
    var product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    if (product.owner != req.userId) {
      throw new Error("You are not the owner of this product");
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
      return res.status(400).send({ error: "Product not found" });
    }

    await product.remove();
    return res.status(200).send({ message: "Product deleted" });
  } catch (err) {
    throw new Error(err);
  }
}
