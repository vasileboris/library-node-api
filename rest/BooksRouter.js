const express = require('express');
const booksService = require('../service/BooksService');

const router = express.Router();
router.get('/', (req, res) => {
  const { user } = req.params;
  res.send(booksService.getUserBooks(user));
});

module.exports = router;
