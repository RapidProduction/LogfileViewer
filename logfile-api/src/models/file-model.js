const path = require('path');
const fileConnector = require('../connectors/file-connector');

class FileModel {
  constructor(filename) {
    this.filename = filename;
  }

  static find(filename) {
    return new Promise((resolve, reject) => {
      fileConnector.exist(filename)
        .then(() => resolve(new FileModel(filename)))
        .catch((error) => reject(error.message));
    });
  }

  get attributes() {
    return new Promise((resolve, reject) => {
      fileConnector.find(this.filename)
        .then((information) =>
          resolve(Object.assign({}, information , { id: this.filename})))
        .catch((error) => reject(error.message));
    });
  }

  read(index, offset) {
    return fileConnector.read(this.filename, index, offset);
  }
}

module.exports = FileModel;