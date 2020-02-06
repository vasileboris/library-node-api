const express = require('express');
const BooksService = require('../service/BooksService');

const booksService = new BooksService();
const router = express.Router();

router.get('/', (req, res, next) => {
    const { user } = req;
    const { searchText } = req.query;
    booksService.getUserBooks(user, searchText)
        .then(books => res.send(books))
        .catch(err => next(err));
});

module.exports = router;
