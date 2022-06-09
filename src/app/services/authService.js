const bcrypt = require("bcryptjs");

var User = require('../models/User')

exports.register = async function (body) {
  try {
    var user = await User.create(body);
    user.password = undefined;
    return user;
  } catch (err) {
    throw Error('Error creating user' + err);
  }
}

exports.authenticate = async function (email, password) {
  try {
    var user = await User.findOne({ email }).select('+password');

    // Verify if user exists
    if (!user) throw Error('User not found');

    // Verify if password is correct
    if(!await bcrypt.compare(password, user.password))
      throw Error('Invalid password');

    // Remove password from user
    user.password = undefined;

    return user;
  } catch (err) {
    throw Error('Error authenticating user' + err);
  }
}

exports.delete = async function (id) {
  try {
    if(!await User.findById(id)) throw Error('Email not found');
    var user = await User.findByIdAndDelete(id);
    return user;
  } catch (err) {
    throw Error('Error deleting user' + err);
  }
}
