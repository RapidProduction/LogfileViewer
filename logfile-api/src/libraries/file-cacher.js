const { logfilePath } = require('../config/app-config');
const path = require('path');

let fileCache = [];
const singleton = Symbol();
const singletonEnforcer = Symbol();

class FileCacher {
  constructor(enforcer) {
    if(enforcer != singletonEnforcer) {
      throw 'Cannot create singleton';
    }
  }

  static get instance() {
    if(!this[singleton]) {
      this[singleton] = new FileCacher(singletonEnforcer);
    }
    return this[singleton];
  }

  buildCache(filename) {
    const fullpath = path.join(logfilePath, filename);
  }

  getPosition(filename, lineNumber) {
    const fullpath = path.join(logfilePath, filename);
    return null;
  }
}

module.exports = FileCacher;


