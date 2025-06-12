const express = require('express');
const catgoryRouter = require('./routes/catgoryRouter');
const wordRouter = require('./routes/wordRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/catgories', catgoryRouter);
app.use('/api/words', wordRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

module.exports = app;