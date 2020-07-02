const Bull = require('bull');

const booksQueue = new Bull('books');
