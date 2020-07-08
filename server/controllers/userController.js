const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = require('../database');

const bcryptSaltRounds = 10;

// ----------------
// Helper functions
// ----------------

const findUserByEmail = async (email) => {
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  return user.rows[0];
};

const hashPassword = async (password) => {
  const encryptedPassword = await bcrypt.hash(password, bcryptSaltRounds);
  return encryptedPassword;
};

const validateEmail = (email) => {
  // Regex for email validation from: https://stackoverflow.com/a/46181/2040509
  // If you want to modify this regex, make sure the front end matches
  const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  if (email.match(regex)) return true;
  return false;
};

const validatePassword = (password) => {
  // Password must be between 4 and 10 digits long and include at least one numeric digit
  // Regex from: http://regexlib.com/REDetails.aspx?regexp_id=30
  // If you want to modify this regex, make sure the front end matches
  const regex = /^(?=.*\d).{4,10}$/;
  if (password.match(regex)) return true;
  return false;
};

// ---------------
// POST - Register
// ---------------

// Route: /api/user/register
// -- Expects a email and password key to be present in the body of the request
// -- That email and password should already be validated on the front end...
// ...but will be validated again on the backend
//
// Response will return a object and a JWT in a cookie:
// -- If the objects error key is not empty, you know there's an error and can read the message
// -- Otherwise the data key will contain the user info that was added to the db
// -- JWT will contain the user email in the payload

const register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    // Check if user already exists
    if (user) {
      return res.json({ message: 'User already exists' });
    }

    // Validate password
    if (!validatePassword(password)) {
      return res.status(403).json({ message: 'Invalid password format' });
    }

    // Validate username
    if (!validateEmail(email)) {
      return res.status(403).json({ message: 'Invalid email format' });
    }

    // Encrypt password
    const encryptedPassword = await hashPassword(password);

    // Register new user
    const newUser = await pool.query(
      'INSERT INTO users (email, password) VALUES($1, $2) RETURNING *',
      [email, encryptedPassword]
    );

    // Create a JWT
    const payload = { email };
    const token = jwt.sign(payload, process.env.JWTSECRET, { expiresIn: '1h' });

    return res
      .cookie('token', token, { httpOnly: true })
      .send({ data: newUser.rows[0] });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Incorrect Email or Password' });
    }
    // Load hash, compare password
    const hash = user.password;
    const pwMatch = await bcrypt.compare(password, hash);

    if (!pwMatch) {
      return res.status(401).json({ message: 'Incorrect Email or Password' });
    }

    // generate JWT
    const payload = { email };
    const token = jwt.sign(payload, process.env.JWTSECRET, {
      expiresIn: '1h',
    });

    return res.cookie('token', token, { httpOnly: true }).send({ email }); // maybe favorites
  } catch (err) {
    return next(err);
  }
};

// ------
// Export
// ------

module.exports = {
  register,
  login,
};
