const express = require('express');
const logger = require('morgan');
const config = require('config');
const bullBoard = require('bull-board')
require('./admin/BullBoard');

const booksRouter = require('./rest/BooksRouter');

const app = express();

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.param('user', (req, res, next, user) => {
    req.user = user;
    next();
});
app.use('/users/:user/books', booksRouter);

app.use('/admin/bull/queues', bullBoard.UI);

const { port } = config.get('node');
app.listen(port, () => console.log(`Library Node.js API started on ${port}!`));
