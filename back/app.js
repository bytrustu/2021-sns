const express = require('express');
const app = express();
const { PORT } = require('./config');
const postRouter = require('./routes/post')
const db = require('./models');

db.sequelize.sync()
  .then(() => {
    console.log('db connect success');
  }).catch(console.error);

app.use('/post', postRouter);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});