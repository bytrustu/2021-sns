const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const app = express();
const { PORT, COOKIE_SECRET } = require('./config');
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')
const db = require('./models');
const passportConfig = require('./passport');


db.sequelize.sync()
  .then(() => {
    console.log('db connect success');
  }).catch(console.error);

passportConfig();

app.use(cors({
  origin: '*',
  credentials: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});