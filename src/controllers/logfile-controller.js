const BaseController = require('./base-controller');
const {
  isArray,
  isEmpty,
  isNil,
  map,
} = require('lodash');
const FileSerializer = require('../libraries/serializers/file-serializer');
const FileModel = require('../models/file-model');
const JSONAPISerializer = require('jsonapi-serializer').Serializer;

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
          if(isEmpty(params)) return fileModel.attributes;
          if(isNil(index) || isNil(offset)) reject('Index and offset cannot be null');
          return Promise.all([
              fileModel.attributes,
              fileModel.read(parseInt(index), parseInt(offset))
            ]);
        })
        .then(dataset => {
          if(isArray(dataset)){
            const [ file , contents ] = dataset;
            const result = Object.assign({}, file, { content:
              map(contents, (value, contentIndex) => ({
                id: contentIndex + parseInt(index),
                content: value,
              })),
            });
            resolve(FileSerializer.serialize(result));
          }
          resolve(FileSerializer.serialize(dataset));
        })
        .catch(reject);
    });
  }
}

module.exports = LogFileController;