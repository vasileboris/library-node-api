const BooksRedis = require('../redis/BooksRedis');

const booksRedis = new BooksRedis();

class BooksService {
    async getUserBooks(user, searchText) {
        await booksRedis.storeUserBooks(user);
        return await booksRedis.getUserBooks(user, searchText);
    }
}

module.exports = BooksService;
