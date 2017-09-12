const fs = require('fs');
const { isNil } = require('lodash');
const path = require('path');

const {
  isExist,
  getfileInformation,
  readline,
} = require('../libraries/file-manipulator');

const exist = (filename) => isExist(filename);

const find = (filename) => getfileInformation(filename);

const read = (filename, index, numberOfLine) => {
  return new Promise((resolve, reject) => {
    readline(filename, index, numberOfLine)
      .then(resolve)
      .catch((error) => reject(error.message));
  });
};

const getFilesFromDirectories = (directoryPath) => {
  // Find files in the directory
};

module.exports = {
  exist,
  find,
  getFilesFromDirectories,
  read,
};