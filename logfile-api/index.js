const express = require('express');
const logfileRouter = require('./src/routers/logfile-router');
const cors = require('cors');

const app = express();
const PORT = 9001;

app.use(cors());
app.use('/api/logfile', logfileRouter);
app.listen(PORT, () => {
  console.log(`Logfile API is successfully running on port ${PORT}...`);
});