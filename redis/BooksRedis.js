const BooksPersistence = require('../persistence/BooksPersistence');
const redis = require('./RedisClient');

const BOOKS_KEY_PREFIX = 'books';
const BOOKS_TTL_MINUTES = 10;
const BOOKS_STORE_JOB_COUNT_KEY_PREFIX = 'books:store-job:count';

const booksPersistence = new BooksPersistence();

class BooksRedis {
    buildBooksKey(user) {
        return `${BOOKS_KEY_PREFIX}:${user}`;
    }

    buildBooksStoreJobCountKey(user) {
        return `${BOOKS_STORE_JOB_COUNT_KEY_PREFIX}:${user}`;
    }

    async storeUserBooks(user) {
        const books = await booksPersistence.getUserBooks(user);
        let booksKey = this.buildBooksKey(user);
        await redis.setAsync(booksKey, JSON.stringify(books));
        await redis.expireAsync(booksKey, BOOKS_TTL_MINUTES * 60);
        await redis.delAsync(this.buildBooksStoreJobCountKey(user));
    }

    async getUserBooks(user, searchText) {
        let books = [];
        const storedBooks = await redis.getAsync(this.buildBooksKey(user));
        if(storedBooks) {
            books = JSON.parse(storedBooks);
        }
        return books.filter(book => booksPersistence.applySearchCriteria(book, searchText));
    }
}

module.exports = BooksRedis;
