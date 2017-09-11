const fs = require('fs');

const { logfilePath } = require('../config/app-config');
const {
  countLine,
  readline,
} = require('../libraries/file-manipulator');

const guardFilename = (filename) => {
  if(filename === undefined || filename === null) {
    throw 'filename should not be undefined or null';
  }
  else if(!filename.startsWith(logfilePath)) {
    throw 'filename should start with correct initial path';
  }
}

const find = (filename) => {
  return new Promise((resolve, reject) => {
    try {
      guardFilename(filename);
      fs.stat(filename, (error, stats) => {
        if(error) throw error;
        countLine(filename)
          .then((line) => {
            resolve(Object.assign({}, stats, { line }))
          })
          .catch(reject);
      });
    }
    catch(error) {
      console.log("Crashs at " + error);
      reject(error);
    }
  });
};

const read = (filename, index, numberOfLine) => {
  return new Promise((resolve, reject) => {
    try {
      guardFilename(filename);
      readline(filename, index, numberOfLine)
        .then(resolve)
        .catch(reject);
    }
    catch(error) {
      reject(error);
    }
  });
};

const getFilesFromDirectories = (directoryPath) => {
  // Find files in the directory
};

module.exports = {
  find,
  getFilesFromDirectories,
  read,
};