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
}

module.exports = BooksPersistence;
