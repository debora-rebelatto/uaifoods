const Restaurant = require("../models/Restaurant");

exports.filter = async (query) => {
  try {
    let city = query.city
    let cuisine = query.cuisine

    let restaurants = await Restaurant.find({
      $or: [
        { city: city },
        { typeofRestaurant: cuisine },
      ],
    }).populate([ "products" ]);

    return restaurants;
  } catch (err) {
    throw err;
  }
}


//check if restaurant exists
exports.checkIfRestaurantExists = async (id) => {
  try {
    var restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    return true;
  } catch (err) {
    throw new Error(err);
  }
}

exports.createRestaurant = async (body, userId) => {
  try {
    //verify if cnpj already exists
    if (await Restaurant.findOne({ cnpj: body.cnpj })) {
      throw new Error("Restaurant already exists");
    }

    var restaurant = await Restaurant.create({ ...body, owner: userId });
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
      throw Error("Restaurant not found");
    }
    if (restaurant.owner != userId) {
      throw Error("You are not the owner of this restaurant");
    }
    return restaurant;
  } catch (err) {
    throw Error(err);
  }
}

exports.update = async (id, body) => {
  try {
    var updatedRestaurant = await Restaurant.findByIdAndUpdate(id, body, { new: true });
    return updatedRestaurant;
  } catch (err) {
    throw new Error(err);
  }
}

exports.delete = async (id) => {
  try {
    if(!await this.checkIfRestaurantExists(id)) return;

    await Restaurant.remove();
    return Restaurant;
  } catch (err) {
    throw new Error(err);
  }
}