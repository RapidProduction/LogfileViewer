const path = require('path');
const fileConnector = require('../connectors/file-connector');

class FileModel {
  constructor(relativeFilename) {
    this.relativeFilename = relativeFilename
    this.filename = FileModel.fullpath(relativeFilename);
  }

  static get initialPath() {
    return '/Users/max/Desktop/temp';
  }

  static fullpath(relativeFilename) {
    return path.join(this.initialPath, relativeFilename);
  }

  static find(relativeFilename) {
    return new Promise((resolve, reject) => {
      fileConnector.find(FileModel.fullpath(relativeFilename))
        .then(() => { resolve(new FileModel(relativeFilename)); })
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