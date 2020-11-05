const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const path = require('path');

const app = express();
const { PORT, COOKIE_SECRET } = require('./config');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');


db.sequelize.sync()
  .then(() => {
    console.log('db connect success');
  }).catch(console.error);

passportConfig();

app.use(cors({
  origin: ['http://localhost:3060'],
  credentials: true,
}));

app.use('/images', express.static(path.join(__dirname, 'uploads')));
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
app.use('/posts', postsRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});