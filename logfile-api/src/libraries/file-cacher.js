const fs = require('fs');
const path = require('path');
const {
  isNil,
  get,
} = require('lodash');
const { logfilePath } = require('../config/app-config');

let fileCache = {};
const singleton = Symbol();
const singletonEnforcer = Symbol();

const toFullpath = (filename) => path.join(logfilePath, filename);

class FileCacher {
  constructor(enforcer) {
    if(enforcer !== singletonEnforcer) {
      throw 'Cannot create singleton';
    }
  }

  static get instance() {
    if(isNil(this[singleton])) {
      this[singleton] = new FileCacher(singletonEnforcer);
    }
    return this[singleton];
  }

  buildCache(filename) {
    this.getLineCache(filename)
      .then((cache) => {
        fileCache[filename] = cache;
        console.log(fileCache[filename].length);
      })
      .catch((error) => console.log(error.message));
  }

  getPosition(filename, lineNumber) {
    if(fileCache.hasOwnProperty(filename)) {
      const byte = get(fileCache[filename], `[${lineNumber}].byte`, null);
      console.log(`Using cache of ${filename} on index ${lineNumber} at byte ${byte} `)
      return byte;
    }
    else {
      // TODO: Add logic here to rebuild cache when file getting dirty
      this.buildCache(filename);
      return null;
    }
  }

  getLineCache(filename) {
    return new Promise((resolve, reject) => {
      let byte = 0;
      let count = 0;
      let lineCache = [];
      let newline = false;
      lineCache.push({
        index: 0,
        byte: 0,
      });

      const fullpath = toFullpath(filename);
      console.log(fullpath);
      fs.createReadStream(fullpath)
        .on('data', (bytes) => {
          for(let i=0; i<bytes.length; ++i) {
            if(newline) {
              lineCache.push({
                index: count,
                byte,
              });
              newline = false;
            }
            if(bytes[i] == 10) {
              count++;
              newline = true;
            }
            byte++;
          }
        })
        .on('end', () => {
          resolve(lineCache);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  };
}

module.exports = FileCacher;


