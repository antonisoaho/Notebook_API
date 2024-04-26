const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader)
    return res.status(401).send({ error: 'Authentication token missing' });

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token)
    return res
      .status(401)
      .send({ error: 'Invalid format of authentication header' });

  try {
    const KEY = process.env.JWT_KEY;
    const decoded = jwt.verify(token, KEY);

    req.user = {
      username: decoded.username,
      userId: decoded.userId,
    };
  } catch (err) {
    return res.status(401).send({ error: 'Invalid token' });
  }
  return next();
};

module.exports = auth;
