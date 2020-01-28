const booksPersistence = require('../persistence/BooksPersistence');

const getUserBooks = (user, searchText) => booksPersistence.getUserBooks(user, searchText);

module.exports = {
    getUserBooks
};
