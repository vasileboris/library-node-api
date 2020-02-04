const config = require('config');

function getLibraryFolder() {
    const { filesystem } = config.get('persistence');
    return filesystem.rootFolder;
}

module.exports = {
  getLibraryFolder
};
