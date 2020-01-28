const express = require('express');
const logger = require('morgan');

const booksRouter = require('./routes/books');

const app = express();

app.use(logger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/books', booksRouter);

const port = process.env.PORT || 9090;
app.listen(port, () => console.log(`Library Node.js API started on ${port}!`));
