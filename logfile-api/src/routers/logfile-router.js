const express = require('express');
const router = express.Router();
const LogfileController = require('../controllers/logfile-controller');

router.get('/:id', (request, response) => {
  LogfileController.get(request.params.id, request.query)
    .then((file) => {
      response.send(file);
    })
    .catch(response.send);
});

module.exports = router;