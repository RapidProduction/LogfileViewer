const expect = require('chai').expect;
const {
  countLine,
  readline,
} = require('../../src/libraries/file-manipulator');
const {
  createFileRandomly,
  removeAllFileInDirectory,
} = require('../../src/libraries/file-manipulator');
const { fromContentToArray } = require('../../src/libraries/content-formatter');

describe('File Manipulator', () => {
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

  describe('CountLine', () => {
    describe('When file does not exist', () => {
      it('should return error reason', () => {
        countLine('/incorrect-path-name')
          .catch((error) => {
            expect(error).to.not.equal(null);
          });
      });
    });

    describe('When file exists', () => {
      it('should return number of line count', () => {
        countLine(fixtureFilename)
          .then((count) => {
            expect(count).to.equal(fromContentToArray(fixtureContent).length);
          });
      });
    });
  });

  describe('ReadLine', () => {
    describe('When file does not exist', () => {
      it('should return error reason', () => {
        readline('/incorrect-path-name')
          .catch((error) => {
            expect(error).to.not.equal(null);
          });
      });
    });

    describe('When file exists', () => {
      it('should return specific content', () => {
        readline(fixtureFilename, 0, fromContentToArray(fixtureContent).length)
          .then((contents) => {
            expect(contents).to.not.equal(null)
            expect(contents).to.not.equal([])
            expect(contents.length).to.equal(fromContentToArray(fixtureContent).length);
          });
      });
    });

    describe('When start index is exceed the rest of line count', () => {
      it('should return an empty array', () => {
        const contentLength = fromContentToArray(fixtureContent).length;
        readline(fixtureFilename, contentLength, 20)
          .then((contents) => {
            expect(contents.length).to.not.equal(null);
            expect(contents.length).to.equal(0);
          });
      });
    });

    describe('When start index is less than zero', () => {
      it('should return error reason', () => {
        const contentLength = fromContentToArray(fixtureContent).length;
        readline(fixtureFilename, contentLength, 20)
          .catch((error) => {
            expect(error).to.not.equal(null);
            expect(error).to.equal('index cannot be less than 0');
          });
      });
    });

    describe('When start index is in between line count', () => {
      it('should return proper start line content', () => {
        const contentLength = fromContentToArray(fixtureContent).length;
        readline(fixtureFilename, contentLength/2, 20)
          .then((contents) => {
            expect(contents).to.not.equal(null);
            expect(contents.length).to.equal(20);
            expect(contents[0]).to.equal(
              fromContentToArray(fixtureContent)[contentLength/2]);
          });
      });
    });
  });
});