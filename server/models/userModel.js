const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: 'users' }
);

userSchema.pre('save', async function hashPassword(next) {
  const user = this;
  try {
    const hash = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
    user.password = hash;
    next();
  } catch (e) {
    console.log('userSchema.pre caught error', e);
    next(e);
  }
});

const Users = mongoose.model('users', userSchema);

module.exports = {
  Users,
};
