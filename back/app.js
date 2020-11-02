const express = require('express');
const { PORT } = require('./config');
const postRouter = require('./routes/post')

const app = express();
app.use('/post', postRouter);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});