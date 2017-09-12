// Warning: it might delete your important files
let initialPath = '/var/tmp';
if(process.env.NODE_ENV === 'test') {
  initialPath = '/var/tmp/logfile-test';
}

module.exports = {
  logfilePath: initialPath,
};