const express = require('express');
const logger = require('morgan');
const config = require('config');

const booksRouter = require('./rest/BooksRouter');
const BooksWorker = require('./redis/BooksWorker');

const app = express();

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.param('user', (req, res, next, user) => {
    req.user = user;
    next();
});
app.use('/users/:user/books', booksRouter);

const { port } = config.get('node');
app.listen(port, () => console.log(`Library Node.js API started on ${port}!`));

const booksWorker = new BooksWorker();
booksWorker.scheduleBooksStoreJob('user');
