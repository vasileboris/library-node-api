const express = require('express');
const logger = require('morgan');

const booksRouter = require('./rest/BooksRouter');

const app = express();

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users/:user/books', booksRouter);

const port = process.env.PORT || 9090;
app.listen(port, () => console.log(`Library Node.js API started on ${port}!`));
