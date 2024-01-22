const path = require('path');
const fs = require('fs/promises');
const fsPromise = require('fs/promises');
const sourceDirectoryPath = path.join(__dirname, 'files');
const copyDirectoryPath = path.join(__dirname, 'files-copy');

fs.rm(copyDirectoryPath, { recursive: true, force: true })
  .then(() => {
    return fs.mkdir(copyDirectoryPath, { recursive: true });
  })
  .then(() => {
    return fsPromise.readdir(sourceDirectoryPath, { withFileTypes: true });
  })
  .then((files) => {
    files.forEach((file) => {
      if (file.isFile()) {
        const sourceFilePath = path.join(sourceDirectoryPath, file.name);
        const destinationFilePath = path.join(copyDirectoryPath, file.name);
        fs.copyFile(sourceFilePath, destinationFilePath);
      }
    });
  })
  .catch((err) => {
    console.error(err);
  });
