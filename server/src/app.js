const express = require('express');
const catgoriesRouter = require('./routes/catgoriesRouter');
const wordsRouter = require('./routes/wordsRouter');
const usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/catgories', catgoriesRouter);
app.use('/api/words', wordsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

module.exports = app;