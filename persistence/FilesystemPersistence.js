const util = require('util');
const fs = require('fs');

const FILE_EXTENSION = '.json';
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const access = util.promisify(fs.access);
const mkdir = util.promisify(fs.mkdir);

class FilesystemPersistence {
    async getUserItems(user, searchText) {
        const storageFolder = await this.createStorageFolderIfMissing(user);
        const fileNames = await readdir(storageFolder);
        return (await Promise.all(fileNames
            .filter(fileName => fileName.endsWith(FILE_EXTENSION))
            .map(async (fileName) => JSON.parse(await readFile(`${storageFolder}/${fileName}`, 'utf8')))))
            .filter(item => this.applySearchCriteria(item, searchText));
    }

    async createStorageFolderIfMissing(user) {
        const storageFolder = this.getStorageFolder(user);
        await this.createFolderIfMissing(storageFolder);
        return storageFolder;
    }

    /**
     * It creates recursively the folder.
     * For some reason mkdir(folder, {recursively: true}) fails
     *
     * @param folder The folder to be created if missing
     * @returns {Promise<void>}
     */
    async createFolderIfMissing(folder) {
        try {
            await access(folder, fs.constants.F_OK);
        } catch(err) {
            const lastIndexPathSeparator = folder.lastIndexOf('/');
            if(lastIndexPathSeparator > 0) {
                await this.createFolderIfMissing(folder.substring(0, lastIndexPathSeparator));
            }
            await (mkdir(folder))
        }
    }

}

module.exports = FilesystemPersistence;
