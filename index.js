const express = require('express');
const logfileRouter = require('./src/routers/logfile-router');

const app = express();
const PORT = 9001;

app.use('/api/logfile', logfileRouter);
app.listen(PORT, () => {
  console.log(`Logfile API is successfully running on port ${PORT}...`);
});