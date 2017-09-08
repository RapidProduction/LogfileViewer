const BaseController = require('./base-controller');
const FileModel = require('../models/file-model');
const { isNil } = require('lodash');

class LogFileController extends BaseController {
  static get() {
    // Search file model by query
  }

  static get(id, params) {
    const { index, offset } = this.whitelistParams(['index', 'offset']);
    return new Promise((resolve, reject) => {
      FileModel.find(id)
        .then((fileModel) => {
          if(isNil(index) || isNil(offset)) {
            reject('Index and offset cannot be null');
          }
          resolve(fileModel.read(index, offset));
        })
        .catch(reject);
    });
  }
}

module.exports = LogFileController;