const Bull = require('bull');
const bullBoard = require('bull-board')

const booksQueue = new Bull('books');
bullBoard.setQueues([booksQueue]);
