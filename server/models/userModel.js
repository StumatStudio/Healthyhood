const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: 'users' }
);

// Pre hook will be called before user credentials are saved to the DB
// This will hash the password in the DB when new users are created
userSchema.pre('save', async function hashPassword(next) {
  const user = this;
  try {
    const hash = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
    user.password = hash;
    next();
  } catch (error) {
    next({
      message: 'Error occurred in userSchema.pre save hook',
      serverMessage: {
        err: error,
      },
    });
  }
});

const Users = mongoose.model('users', userSchema);

module.exports = {
  Users,
};
