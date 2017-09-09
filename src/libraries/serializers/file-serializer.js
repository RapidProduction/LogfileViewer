const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const FileSerializer = new JSONAPISerializer('file', {
  attributes: [
    'blksize',
    'ino',
    'size',
    'blocks',
    'atime',
    'mtime',
    'ctime',
    'birthtime',
  ],
});

module.exports = FileSerializer;