const path = require('path');

const { logfilePath } = require('../config/app-config');
const fileConnector = require('../connectors/file-connector');

class FileModel {
  constructor(filename) {
    this.filename = filename;
  }

  static get initialPath() {
    return logfilePath;
  }

  static fullpath(filename) {
    return path.join(this.initialPath, filename);
  }

  static find(filename) {
    return new Promise((resolve, reject) => {
      fileConnector.find(filename)
        .then(() => resolve(new FileModel(filename)))
        .catch(reject);
    });
  }

  get attributes() {
    return new Promise((resolve, reject) => {
      fileConnector.find(this.filename)
        .then((information) => {
          resolve(Object.assign({}, information , { id: this.filename}));
        })
        .catch(reject)
    });
  }

  read(index, offset) {
    return fileConnector.read(this.filename, index, offset);
  }
}

module.exports = FileModel;