const BaseController = require('./base-controller');
const { isNil } = require('lodash');
const FileSerializer = require('../libraries/serializers/file-serializer');
const FileModel = require('../models/file-model');

class LogFileController extends BaseController {
  constructor() {
    super();
  }

  static get whitelistParams() {
    return ['index', 'offset'];
  }

  static get() {
    // Search file model by query
  }

  static get(id, params) {
    return new Promise((resolve, reject) => {
      const { index, offset } = super.whitelistParams(params, LogFileController.whitelistParams);
      FileModel.find(id)
        .then((fileModel) => {
          return fileModel.attributes;
        })
        .then((attributes) => {
          if(isNil(index) || isNil(offset)) {
            reject('Index and offset cannot be null');
          }
          else if(){
            return (FileSerializer.serialize(attributes));
          }
        })
        .then((fileModel) => {
          
        })
        .catch(reject);
    });
  }
}

module.exports = LogFileController;