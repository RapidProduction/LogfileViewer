const express = require('express');
const LogfileController = require('./src/controllers/logfile-controller');

const app = express();
const PORT = 9001;

app.get('/', (request, response) => {
  response.send('Hello World');
});

app.get('/api/:id', (request, response) => {
  LogfileController.get(request.param('id'), )
});

app.listen(PORT, () => {
  console.log(`Logfile API is successfully running on port ${PORT}...`);
});