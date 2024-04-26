const { decrypt } = require('dotenv');
const User = require('../models/UserModel');
const { decryptPassword } = require('../middlewares/UserMiddleware');
const jwt = require('jsonwebtoken');

const registerUser = async (username, password) => {
  try {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) throw new Error('User already exists');

    const user = new User({ username: username, password: password });
    const result = await user.save();

    const parsedResult = {
      username: result.username,
      password: result.password,
      _id: result._id,
      createdAt: result.createdAt,
    };

    return { status: 201, result: parsedResult };
  } catch (error) {
    if (error.message == 'User already exists') {
      return { status: 409, result: { error: error.message } };
    } else {
      throw error;
    }
  }
};

const loginUser = async (username, password) => {
  try {
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) throw new Error('Username not found');

    const passwordMatch = await decryptPassword(
      password,
      existingUser.password
    );
    if (!passwordMatch) return { status: 404, result: 'Incorrect password' };

    const result = jwt.sign(
      { username: existingUser.username, userId: existingUser._id },
      process.env.JWT_KEY,
      {
        expiresIn: '2h',
      }
    );

    return { status: 200, result: { token: result } };
  } catch (error) {
    if (error.message !== 'Username not found') {
      throw error;
    } else {
      return { status: 404, result: { error: error.message } };
    }
  }
};

module.exports = { registerUser, loginUser };
