const mongoose = require('../../database/database')
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
})

UserSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash;

  next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;