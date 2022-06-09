const User = require('../models/User');
const UserServices = require('../services/userServices');

// List All Users
exports.getAll = async function (req, res, next) {
  try {
    // if has no user, return
    var users = await User.find();
    return res.status(200).send( users );
  } catch(err) {
    return res.status(400).json({ message: err.message });
  }
};

// Get User by ID
exports.getById = async function (req, res, next) {
  var id = req.params.id;
  try {
    var user = await User.findById(id);
    return res.status(200).send( user );
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

