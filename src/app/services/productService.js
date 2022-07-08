const Product = require("../models/Product");
const Restaurant = require("../models/Restaurant");

module.exports = {
  filter,
  createProduct,
  pushProductToRestaurant,
  update,
  deleteById
}


async function filter (query) {
  try {
    let productName = query.name.toString();

    let products = await Product.find({
      $or: [
        { name: { $regex: productName, $options: 'i' } },
      ],
    }).populate([ "restaurant" ]);

    return products;
  } catch (err) {
    throw err;
  }
}

async function createProduct(body, restaurantId) {
  try {

    var product = await Product.create({ ...body, restaurant: restaurantId });

    return product;
  } catch (err) {
    throw new Error(err);
  }
}

async function pushProductToRestaurant(restaurantId, productId) {
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

async function update(id, body, userId) {
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

async function deleteById(id) {
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
