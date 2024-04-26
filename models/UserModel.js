const { Schema, model } = require('mongoose');
const { encryptPassword } = require('../middlewares/UserMiddleware');

const UserSchema = new Schema(
  {
    username: String,
    password: String,
  },
  { timestamps: true, versionKey: false }
);

UserSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();
  const hashedPassword = await encryptPassword(user.password);
  user.password = hashedPassword;

  next();
});

const User = model('User', UserSchema);

module.exports = User;
