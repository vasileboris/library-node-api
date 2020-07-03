const redis = require("redis");
const { promisify } = require("util");

const BooksPersistence = require('../persistence/BooksPersistence');

const BOOKS_KEY_PREFIX = "books";
const BOOKS_TTL_MINUTES = 10;

const buildBooksKey = user => `${BOOKS_KEY_PREFIX}:${user}`;

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

const booksPersistence = new BooksPersistence();

class BooksRedis {
    async storeUserBooks(user) {
        const books = await booksPersistence.getUserBooks(user);
        let booksKey = buildBooksKey(user);
        client.set(booksKey, JSON.stringify(books));
        client.expire(booksKey, BOOKS_TTL_MINUTES * 60);
    }

    async getUserBooks(user, searchText) {
        let books = [];
        const storedBooks = await getAsync(buildBooksKey(user));
        if(storedBooks) {
            books = JSON.parse(storedBooks);
        }
        return books.filter(book => booksPersistence.applySearchCriteria(book, searchText));
    }
}

module.exports = BooksRedis;

