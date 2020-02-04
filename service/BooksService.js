const BooksPersistence = require('../persistence/BooksPersistence');

const booksPersistence = new BooksPersistence();

class BooksService {
    async getUserBooks(user, searchText) {
        return await booksPersistence.getUserBooks(user, searchText);
    }
}

module.exports = BooksService;
