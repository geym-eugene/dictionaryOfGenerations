const express = require('express');
const catgoryRouter = require('./routes/categoryRouter');
const wordRouter = require('./routes/wordRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const tokensRouter = require('./routes/tokensRouter');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/categories', catgoryRouter);
app.use('/api/words', wordRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokensRouter);

module.exports = app;