const util = require('util');
const fs = require('fs');

const FILE_EXTENSION = '.json';
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

class FilesystemPersistence {
    async getUserItems(user, searchText) {
        const storageFolder = this.getStorageFolder(user);
        const fileNames = await readdir(storageFolder);
        return Promise.all(fileNames
            .filter(fileName => fileName.endsWith(FILE_EXTENSION))
            .map(async (fileName) => JSON.parse(await readFile(`${storageFolder}/${fileName}`, 'utf8'))));
    }

}

module.exports = FilesystemPersistence;
