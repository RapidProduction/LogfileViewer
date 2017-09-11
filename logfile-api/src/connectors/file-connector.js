const fs = require('fs');
const { isNil } = require('lodash');
const path = require('path');

const {
  countLine,
  readline,
  toFullpath,
} = require('../libraries/file-manipulator');

const guardFilename = (filename) => {
  if(isNil(filename)) {
    throw 'filename should not be undefined or null';
  }
}

const find = (filename) => {
  return new Promise((resolve, reject) => {
    try {
      guardFilename(filename);
      fs.stat(toFullpath(filename), (error, stats) => {
        if(error) reject(error);
        countLine(filename)
          .then((line) => {
            resolve(Object.assign({}, stats, { line }))
          })
          .catch(reject);
      });
    }
    catch(error) {
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