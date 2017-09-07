const faker = require('faker');
const fs = require('fs');
const path = require('path');
const { reduce } = require('lodash');

// TODO: Reuse this fixed path
// This is important it would delete your important file
const initialPath = '/Users/max/Desktop/temp';
const createFileRandomly = (numberOfLine) => {
  const filename = path.join(initialPath, faker.system.fileName());
  const content = faker.lorem.lines(numberOfLine);
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, content, 'utf-8', () => resolve({ filename, content }));
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
}

module.exports = {
  createFileRandomly,
  removeAllFileInDirectory
}