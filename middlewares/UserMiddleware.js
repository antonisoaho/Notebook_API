const bcrypt = require('bcryptjs');
const saltRounds = 10;

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

const decryptPassword = async (password, userPassword) => {
  const passwordMatch = await bcrypt.compare(password, userPassword);

  return passwordMatch;
};

module.exports = { encryptPassword, decryptPassword };
