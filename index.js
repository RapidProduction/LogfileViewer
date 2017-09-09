const express = require('express');
const LogfileController = require('./src/controllers/logfile-controller');

const app = express();
const PORT = 9001;

app.get('/', (request, response) => {
  // TODO: Searching file through controller
  response.send('Hello World');
});

app.get('/api/logfile/:id', (request, response) => {
  LogfileController.get(request.params.id, request.query)
    .then((contents) => {
      console.log(contents);
      response.send(contents);
    })
    .catch(response.send);
});

app.listen(PORT, () => {
  console.log(`Logfile API is successfully running on port ${PORT}...`);
});