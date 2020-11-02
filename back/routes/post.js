const express = require('express');
const router = express.Router();

router.get('/send', (req, res) => {
  console.log('/post/send');
})

module.exports = router;