const express = require('express');
const { registerUser, loginUser } = require('../services/UsersService');
const router = express.Router();

router
  .post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) res.sendStatus(400);

    try {
      const response = await registerUser(username, password);

      res.status(response.status).send(response.result);
    } catch (error) {
      res.status(500).send({ error: 'Internal server error' });
    }
  })
  .post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) res.sendStatus(400);

    try {
      const response = await loginUser(username, password);

      res.status(response.status).send(response.result);
    } catch (error) {
      res.status(500).send({ error: 'Internal server error' });
    }
  });

module.exports = router;
