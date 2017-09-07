const expect = require('chai').expect;
const {
  find,
  getFilesFromDirectories,
  read,
} = require('../../src/connectors/file-connector');
const {
  createFileRandomly,
  removeAllFileInDirectory,
} = require('../helpers/file-manipulator');

describe('Logfile Connector', () => {
  describe('Find', () => {
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

    describe('When file does not exist', () => {
      it('should return error reason', () => {
        read('non-exist-filename')
          .catch((error) => {
            expect(error).to.not.equal(null);
          });
      });
    });

    describe('When file exist', () => {
      it('should return file content as string', () => {
        read(fixtureFilename, 0, fixtureContent.split('\n').length-1)
          .then((content) => {
            expect(content).to.not.equal('');
            expect(content).to.not.equal(null);
            expect(content).to.not.equal(undefined);
          });
      });

      it('should return file content with correct number of line', () => {
        read(fixtureFilename, 0, fixtureContent.split('\n').length-1)
          .then((content) => {
            expect(content.split('\n').length)
              .to.equal(fixtureContent.split('\n').length);
          });
      });

      it('should return file content with correct start line', () => {
        read(fixtureFilename, 0, fixtureContent.split('\n').length-1)
          .then((content) => {
            expect(content.split('\n')[0])
              .to.not.equal(fixtureContent.split('\n')[0]);
          });
      });
    });

    describe('When request is invalid', () => {
      describe('by number of line exceed the actual content', () => {
        it('should return file content with maximum number of line', () => {
          read(fixtureFilename, 0, fixtureContent.split('\n').length*2)
            .then((content) => {
              expect(content.split('\n').length)
                .to.equal(fixtureContent.split('\n').length);
            });
        });
      });

      describe('by starting line is exceed the actual content', () => {
        it('should return content as empty', () => {
          read(fixtureFilename, fixtureContent.split('\n').length,
            fixtureContent.split('\n').length*2)
            .then((content) => {
              expect(content).to.equal('');
            });
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