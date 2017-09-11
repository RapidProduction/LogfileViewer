const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');
const {
  createFileRandomly,
  removeAllFileInDirectory,
} = require('../../src/libraries/file-manipulator');

const should = chai.should();
chai.use(chaiHttp);

describe('LogFile Request', () => {
  let fixtureFilename = fixtureContent = undefined;
  before((done) => {
    createFileRandomly(Math.random() * 1000)
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

  describe('GET api/logfile/{id}', () => {
    describe('When request is valid', () => {
      it('should return file resource', (done) => {
        chai.request(server)
          .get(`/api/logfile/${fixtureFilename}`)
          .end((error, response) => {
              response.should.have.status(200);
              response.body.should.not.be.eql(null);
            done();
          });
      });
    });

    describe('When request is invalid', () => {
      it('should return an error about query params', () => {
        chai.request(server)
          .get(`/api/logfile/${fixtureFilename}?offset=123`)
          .end((error, response) => {
              response.should.have.status(422);
              response.should.have.code('E_UNPROCESSABLE_ENTITY');
              response.body.should.not.be.eql(null);
            done();
          });
      });
    });

    describe('When resource does not exist', () => {
      it('should return resource not found error', () => {
        chai.request(server)
          .get(`/api/logfile/non-exist-filename`)
          .end((error, response) => {
              response.should.have.status(422);
              response.should.have.code('E_UNPROCESSABLE_ENTITY');
            done();
          });
      });
    });
  });
});