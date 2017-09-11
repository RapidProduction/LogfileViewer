const faker = require('faker');
const fs = require('fs');
const path = require('path');
const { reduce } = require('lodash');

const { logfilePath, testPath } = require('../config/app-config');

// Warning: it might delete your important files
const initialPath = testPath;
const countLine = (filename) => {
  return new Promise((resolve, reject) => {
    let count = 0;
    fs.createReadStream(filename)
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
    fs.stat(initialPath, (error) => {
      if(error) {
        fs.mkdir(initialPath, () => {
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
  const filename = path.join(initialPath, faker.system.fileName());
  const content = faker.lorem.lines(numberOfLine);
  return new Promise((resolve, reject) => {
    createDirectory()
      .then(() => {
        fs.writeFile(filename, content, 'utf-8', (error) => {
          if(error) reject(error);
          resolve({ filename, content });
        });
      });
  });
};

const removeAllFileInDirectory = () => {
  return new Promise((resolve) => {
    fs.readdir(initialPath, (error, files) => {
      if(error) throw error;
      for(const file of files) {
        fs.unlink(path.join(initialPath, file), err => {
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

    let buffer = '';
    let count = 0;
    let contents = [];
    fs.createReadStream(filename)
      .on('data', (bytes) => {
        for(let i=0; i<bytes.length; ++i) {
          if(count >= index && count < index + offset) {
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
  });
};

module.exports = {
  countLine,
  createFileRandomly,
  removeAllFileInDirectory,
  readline,
};