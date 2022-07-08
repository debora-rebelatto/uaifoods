const jwt = require('jsonwebtoken');

const authConfig = require("../../config/auth.json");
const AuthService = require("../services/authService");

const User = require('../models/User');

module.exports = {
  register,
  authenticate,
  deleteById
}

async function register (req, res, next) {
  try {
    // verify if email exists
    if(await User.findOne({ email: req.body.email }))
      throw Error('Email already exists');

    var user = await AuthService.register(req.body)
    return res.status(200).send({ user })
  } catch(err) {
    return res.status(400).json({ message: err.message });
  }
};

async function authenticate(req, res, next) {
  try {

    var user = await AuthService.authenticate(req.body.email, req.body.password);

    var token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    return res.status(200).send({ token: token });
  } catch(err) {
    return res.status(400).json({ message: err.message });
  }
};

async function deleteById(req, res, next) {
  var id = req.params.id;
  try {
    await AuthService.delete(id);
    return res.status(200).send({ message: 'User deleted' });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
