const Restaurant = require("../models/Restaurant");

exports.createRestaurant = async (body) => {
  try {
    //verify if cnpj already exists
    if (await Restaurant.findOne({ cnpj: body.cnpj })) {
      throw new Error("Restaurant already exists");
    }

    var restaurant = await Restaurant.create({ ...req.body, owner: req.userId });
    await restaurant.save();
    return restaurant;
  } catch (err) {
    throw new Error(err);
  }
}

exports.checkIfUserIsOwner = async (restaurantId, userId) => {
  try {
    var restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    if (restaurant.owner != userId) {
      throw new Error("You are not the owner of this restaurant");
    }
    return restaurant;
  } catch (err) {
    throw new Error(err);
  }
}

exports.update = async (id, body) => {
  try {
    var restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    if (restaurant.owner != req.userId) {
      throw new Error("You are not the owner of this restaurant");
    }
    var updatedRestaurant = await Restaurant.findByIdAndUpdate(id, body, { new: true });
    return updatedRestaurant;
  } catch (err) {
    throw new Error(err);
  }
}

exports.delete = async (id) => {
  try {
    var restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(400).send({ error: "Restaurant not found" });
    }

    await restaurant.remove();
    return res.status(200).send({ message: "Restaurant deleted" });
  } catch (err) {
    throw new Error(err);
  }
}