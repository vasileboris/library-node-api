const express = require('express');
const BooksService = require('../service/BooksService');

const booksService = new BooksService();
const router = express.Router();

router.get('/', (req, res) => {
  const { user } = req;
  booksService.getUserBooks(user).then(books => res.send(books));
});

module.exports = router;
