const BaseController = require('./base-controller');
const {
  isArray,
  isEmpty,
  isNil,
  map,
} = require('lodash');

const { toUnprocessableEntityError } = require('../libraries/serializers/error-serializer');
const FileSerializer = require('../libraries/serializers/file-serializer');
const FileModel = require('../models/file-model');
const JSONAPISerializer = require('jsonapi-serializer').Serializer;

class LogFileController extends BaseController {
  constructor() { super(); }

  static get whitelistParams() {
    return ['index', 'offset'];
  }

  static get() {
    // TODO: Search file model by query
  }

  static get(id, params) {
    return new Promise((resolve, reject) => {
      const { index, offset } = super.whitelistParams(params, LogFileController.whitelistParams);
      FileModel.find(id)
        .then((fileModel) => {
          if(isEmpty(params)) return fileModel.attributes;
          if(isNil(index) || isNil(offset)) throw 'Index and offset cannot be null';
          return Promise.all([
              fileModel.attributes,
              fileModel.read(parseInt(index), parseInt(offset)),
            ]);
        })
        .then((dataset) => this.serialize(dataset, index))
        .then(resolve)
        .catch((error) => reject(this.serializeError(error)));
    });
  }

  static serialize(dataset, index) {
    let resultDataset = dataset;
    if(isArray(dataset)) {
      const [ file , contents ] = dataset;
      resultDataset = Object.assign({}, file, { content:
        map(contents, (value, contentIndex) => ({
          id: contentIndex + parseInt(index),
          content: value,
        })),
      });
    }

    return FileSerializer.serialize(resultDataset);
  }

  static serializeError(error) {
    return toUnprocessableEntityError(null, error.message);
  }
}

module.exports = LogFileController;