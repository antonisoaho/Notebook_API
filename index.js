const express = require('express');
const auth = require('./middlewares/AuthMiddleware');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const UsersController = require('./controllers/UsersController');
const NotesController = require('./controllers/NotesController');
const setupSwagger = require('./swagger/swagger');

dotenv.config();

const app = express();
const PORT = 3000;
const dbURI = process.env.DB_URI;

app.use(express.json());
app.use(cors());

setupSwagger(app, PORT);

mongoose.connect(dbURI).then(() => {
  console.log('Connected to database.');
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

app.use('/api/user', UsersController);
app.use('/api/notes', auth, NotesController);
