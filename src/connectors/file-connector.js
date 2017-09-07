const fs = require('fs');
const initialPath = '/Users/max/Desktop/temp';

const find = (filename) => {
  return new Promise((resolve, reject) => {
    fs.stat(filename, (error, stats) => {
      if(error) {
        reject(error);
      }
      else {
        resolve(stats);
      }
    });
  });
};

const read = (filename, startLine, numberOfLine) => {
  // read specific file
};

const getFilesFromDirectories = (directoryPath) => {
  // Find files in the directory
};

module.exports = {
  find,
  getFilesFromDirectories,
  read,
};