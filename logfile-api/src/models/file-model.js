const path = require('path');

const { logfilePath } = require('../config/app-config');
const fileConnector = require('../connectors/file-connector');
class FileModel {
  constructor(relativeFilename) {
    this.relativeFilename = relativeFilename
    this.filename = FileModel.fullpath(relativeFilename);
  }

  static get initialPath() {
    return logfilePath;
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
          resolve(Object.assign({}, information , { id: this.relativeFilename}));
        })
        .catch(reject)
    });
  }

  read(index, offset) {
    return fileConnector.read(this.filename, index, offset);
  }
}

module.exports = FileModel;