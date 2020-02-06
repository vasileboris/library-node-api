const FilesystemPersistence = require('./FilesystemPersistence');
const filesystemConfiguration = require('./FilesystemConfiguration');
const books = require('./books');

class BooksPersistence extends FilesystemPersistence {
    async getUserBooks(user, searchText){
        return await this.getUserItems(user, searchText);
    }

    getStorageFolder(user) {
        return `${filesystemConfiguration.getLibraryFolder()}/${user}/books`;
    }

    applySearchCriteria(book, searchText) {
        if(!searchText || !searchText.trim()) return true;

        const content = `${book.title} ${book.authors.join(' ')}`;
        return content.toLowerCase().indexOf(searchText.toLowerCase()) >= 0;
    }
}

module.exports = BooksPersistence;
