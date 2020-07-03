const BooksRedis = require('../redis/BooksRedis');
const BooksWorker = require('../redis/BooksWorker');

const booksRedis = new BooksRedis();
const booksWorker = new BooksWorker();

class BooksService {
    async getUserBooks(user, searchText) {
        await booksWorker.scheduleBooksStoreJob('user');

        return await booksRedis.getUserBooks(user, searchText);
    }
}

module.exports = BooksService;
