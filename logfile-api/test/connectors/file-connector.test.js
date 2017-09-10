const expect = require('chai').expect;
const {
  find,
  getFilesFromDirectories,
  read,
} = require('../../src/connectors/file-connector');
const {
  createFileRandomly,
  removeAllFileInDirectory,
} = require('../../src/libraries/file-manipulator');
const { fromContentToArray } = require('../../src/libraries/content-formatter');

describe('Logfile Connector', () => {
  let fixtureFilename = fixtureContent = undefined;
  before((done) => {
    createFileRandomly(Math.random() * 1000)
      .then(({ filename, content }) => {
        fixtureFilename = filename;
        fixtureContent = content;
      })
      .then(() => { done(); });
  });

  after((done) => {
    removeAllFileInDirectory()
      .then(() => { done(); });
  });

  describe('Find', () => {
    describe('When specific file path is incorrect', () => {
      it('should return error reason', () => {
        find('/incorrect-path-name')
          .catch((error) => {
            expect(error).to.equal('filename should start with correct initial path');
          });
      });
    });

    describe('When specific file path is empty, null, or undefined', () => {
      it('should return error reason', () => {
        find(undefined)
          .catch((error) => {
            expect(error).to.equal('filename should not be undefined or null');
          });
      });

      it('should return error reason', () => {
        find(null)
          .catch((error) => {
            expect(error).to.equal('filename should not be undefined or null');
          });
      });
    });

    describe('When specific file does not exist', () => {
      it('should return error reason', () => {
        find('non-exist-filename')
          .catch((error) => {
            expect(error).to.not.equal(null);
          });
      });
    });

    describe('When specific file exists', () => {
      it('should return file information', () => {
        find(fixtureFilename)
        .then((fileInformation) => {
          expect(fileInformation).to.not.equal(null);
        });
      });
    });
  });

  describe('Read', () => {
    describe('When file does not exist', () => {
      it('should return error reason', () => {
        read('non-exist-filename')
          .catch((error) => {
            expect(error).to.not.equal(null);
          });
      });
    });

    describe('When file exist', () => {
      it('should return file content as array of content lines', () => {
        const contentLength = fromContentToArray(fixtureContent).length;
        read(fixtureFilename, 0, contentLength)
          .then((contents) => {
            expect(contents).to.not.equal(null);
            expect(contents).to.not.equal(undefined);
            expect(contents.length).to.equal(contentLength);
          });
      });
    });
  });

  describe('GetFilesFromDirectories', () => {
    describe('When directory does not exist' , () => {
      it('should return empty array', () => {
        // TODO: Implement
      });
    });

    describe('When directory contain files' , () => {
      it('should return array of filename', () => {
        // TODO: Implement
      });
    });
  });
});