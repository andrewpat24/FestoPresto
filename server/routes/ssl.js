const express = require('express');
const router = express.Router();

router.get(process.env.SSL_PATH_ONE, function(req, res) {
  res.send(process.env.SSL_CERT_ONE);
});

router.get(process.env.SSL_PATH_TWO, function(req, res) {
  res.send(process.env.SSL_CERT_TWO);
});

module.exports = router;
