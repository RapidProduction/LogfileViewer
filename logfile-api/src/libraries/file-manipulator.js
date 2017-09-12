const faker = require('faker');
const fs = require('fs');
const path = require('path');
const {
  isNil,
  reduce,
} = require('lodash');

const FileCacher = require('./file-cacher');
const { logfilePath } = require('../config/app-config');

// Every methods should process on top of the initial path
const toFullpath = (filename) => path.join(logfilePath, filename);

const isExist = (filename) => {
  return new Promise((resolve, reject) => {
    try {
      guardFilename(filename);
      fs.stat(toFullpath(filename), (error, stats) => {
        if(error) resolve(error);
        resolve(true);
      });
    }
    catch(error) {
      reject(error);
    }
  });
};

const guardFilename = (filename) => {
  if(isNil(filename)) {
    throw 'filename should not be undefined or null';
  }
};

const getFileInformation = (filename) => {
  return new Promise((resolve, reject) => {
    try {
      guardFilename(filename);
      fs.stat(toFullpath(filename), (error, stats) => {
        if(error) reject(error);
        countLine(filename)
          .then((line) => resolve(Object.assign({}, stats, { line })))
          .catch(reject);
      });
    }
    catch(error) {
      reject(error);
    }
  });
};

const countLine = (filename) => {
  return new Promise((resolve, reject) => {
    let count = 0;
    const fullpath = toFullpath(filename);
    fs.createReadStream(fullpath)
      .on('data', (bytes) => {
        for(let i=0; i<bytes.length; ++i) {
          if(bytes[i] == 10) {
            count++;
          }
        }
      })
      .on('end', () => {
        resolve(count+1);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

const createDirectory = () => {
  return new Promise((resolve) => {
    fs.stat(logfilePath, (error) => {
      if(error) {
        fs.mkdir(logfilePath, () => {
          resolve();
        });
      }
      else {
        resolve();
      }
    });
  })
};

const createFileRandomly = (numberOfLine) => {
  const filename = faker.system.fileName();
  const fullpath = toFullpath(filename);
  const content = faker.lorem.lines(numberOfLine);
  return new Promise((resolve, reject) => {
    createDirectory()
      .then(() => {
        fs.writeFile(fullpath, content, 'utf-8', (error) => {
          if(error) reject(error);
          resolve({
            filename: fullpath.replace(logfilePath, ''),
            content
          });
        });
      });
  });
};

// This is force to remove file from initial path
const removeAllFileInDirectory = () => {
  return new Promise((resolve) => {
    fs.readdir(logfilePath, (error, files) => {
      if(error) throw error;
      for(const file of files) {
        fs.unlink(path.join(logfilePath, file), err => {
          if (error) throw error;
        });
      }
      resolve();
    });
  });
};

const readline = (filename, index, offset) => {
  return new Promise((resolve, reject) => {
    if(index < 0) reject('index cannot be less than 0');

    try {
      guardFilename(filename);

      let buffer = '';
      let count = 0;
      let contents = [];
      // Looking for cache
      let instance = FileCacher.instance;
      let startIndex = FileCacher.instance.getPosition(filename, index);
      startIndex = isNil(startIndex) ? index : startIndex;
      count = isNil(startIndex) ? count : startIndex;

      fs.createReadStream(toFullpath(filename), { start: startIndex })
        .on('data', (bytes) => {
          for(let i=0; i<bytes.length; ++i) {
            if(count >= startIndex + offset) {
              break;
            }
            else if(count >= startIndex && count < startIndex + offset) {
              if(bytes[i] == 10) {
                contents.push(buffer);
                buffer = '';
              }
              else {
                buffer += String.fromCharCode(bytes[i]);
              }
            }
            if(bytes[i] == 10) count++;
          }
        })
        .on('end', () => {
          if(buffer !== '') contents.push(buffer);
          resolve(contents);
        })
        .on('error', (error) => {
          reject(error);
        });
    }
    catch(error) {
      reject(error);
    }
  });
};

module.exports = {
  countLine,
  createFileRandomly,
  getFileInformation,
  isExist,
  removeAllFileInDirectory,
  readline,
  toFullpath,
};