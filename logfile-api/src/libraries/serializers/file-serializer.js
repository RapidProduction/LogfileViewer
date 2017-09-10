const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const FileSerializer = new JSONAPISerializer('file', {
  attributes: [
    'blksize',
    'blocks',
    'ino',
    'size',
    'atime',
    'mtime',
    'ctime',
    'birthtime',
    'line',
    'content',
  ],
  content: {
    ref: (file, content) => content.id,
    attributes: ['content'],
  }
});

module.exports = FileSerializer;