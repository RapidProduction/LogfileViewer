const express = require('express');
const app = express();

app.get('/', (request, response) => {
  response.send('Hello World');
});

app.listen(9001, () => {
  console.log('Logfile API is successfully run...');
});