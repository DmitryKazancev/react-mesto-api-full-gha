// Imports
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const signupRoutes = require('./routes/signup');
const signinRoutes = require('./routes/signin');
const NotFound = require('./errors/NotFound');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();
app.use(cors());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/signin', signinRoutes);
app.use('/signup', signupRoutes);
app.use(auth);
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use('*', (req, res, next) => {
  next(new NotFound('404 Page not found'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
