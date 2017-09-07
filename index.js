const express = require('express');
const app = express();
const PORT = 9001;

app.get('/', (request, response) => {
  response.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Logfile API is successfully running on port ${PORT}...`);
});