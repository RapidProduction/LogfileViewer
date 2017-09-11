const expect = require('chai').expect;
const FileModel = require('../../src/models/file-model');
const {
  createFileRandomly,
  removeAllFileInDirectory,
} = require('../../src/libraries/file-manipulator');
const { fromContentToArray } = require('../../src/libraries/content-formatter');
const { testPath } = require('../../src/config/app-config');

describe('File Model', () => {
  let fixtureFilename = fixtureContent = undefined;
  before((done) => {
    createFileRandomly((Math.random() * 1000) + 10)
      .then(({ filename, content }) => {
        fixtureFilename = filename;
        fixtureContent = content;
      })
      .then(done);
  });

  after((done) => {
    removeAllFileInDirectory()
      .then(done);
  });

  describe('Find', () => {
    describe('When file does not exist', () => {
      it('should return error reason', () => {
        FileModel.find('/incorrect-path-name')
          .catch((error) => {
            expect(error).to.not.equal(null);
          });
      });
    });

    describe('When file exist', () => {
      it('should return file model instance', () => {
        FileModel.find(fixtureFilename)
          .then((fileModel) => {
            expect(fileModel).to.not.equal(null);
          });
      });
    });
  });

  describe('Instance.read', () => {
    describe('When file does not exist', () => {
      it('should return error reason', () => {
        fileModel = new FileModel('/incorrect-path-name')
        fileModel.read(0, 10)
          .catch((error) => {
            expect(error).to.not.equal(null);
          });
      });
    });

    describe('When file exist', () => {
      it('should return file model instance', () => {
        fileModel = new FileModel(fixtureFilename)
        fileModel.read(0, 10)
          .then((contents) => {
            expect(contents).to.not.equal(null);
            expect(contents.length).to.equal(10);
          });
      });
    });
  });

  describe('Instance.attributes', () => {
    describe('When file does not exist', () => {
      it('should return error reason', () => {
        fileModel = new FileModel('/incorrect-path-name')
        fileModel.attributes
          .catch((error) => {
            expect(error).to.not.equal(null);
          });
      });
    });

    describe('When file exist', () => {
      it('should return file model instance', () => {
        fileModel = new FileModel(fixtureFilename)
        fileModel.attributes
          .then((information) => {
            expect(information).to.not.equal(null);
          });
      });
    });
  });
});