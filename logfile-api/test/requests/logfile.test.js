const httpMocks = require('node-mocks-http');
const logfileRouter = require('../../src/routers/logfile-router');
const buildResponse = () =>
  httpMocks.createResponse({eventEmitter: require('events').EventEmitter});

describe('LogFile Request', () => {
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

  describe('GET api/logfile/{id}', () => {
    describe('When request is valid', () => {
      it('should return file resource', (done) => {
        let response = buildResponse()
        let request  = httpMocks.createRequest({
          method: 'GET',
          url: `/api/logfile/${fixtureFilename}`,
        });

        response.on('end', function() {
          console.log(response._getData);
          // response._getData().should.equal('world');
          done();
        });
        logfileRouter.handle(request, response, () => {
          done();
        });
      });
    });

    describe('When request is invalid', () => {
      it('should return an error about query params', () => {

      });
    });

    describe('When resource does not exist', () => {
      it('should return resource not found error', () => {

      });
    });
  });
});