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

// We only need to connect to the DB once, so perhaps move
// this to a separate file, perhaps server.js
mongoose.set('useCreateIndex', true);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'healthyhood',
  })
  .then(() => console.log('Connected to Mongo DB: healthyhood'))
  .catch(err => console.log(err));

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
