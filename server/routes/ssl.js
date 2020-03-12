const express = require('express');
const router = express.Router();

// If you ever upgrade to a hobby dyno..
// https://medium.com/@bantic/free-tls-with-letsencrypt-and-heroku-in-5-minutes-807361cca5d3
router.get(`/.well-known/acme-challenge/${process.env.SSL_PATH_ONE}`, function(
  req,
  res
) {
  res.send(process.env.SSL_CERT_ONE);
});

router.get(`/.well-known/acme-challenge/${process.env.SSL_PATH_TWO}`, function(
  req,
  res
) {
  res.send(process.env.SSL_CERT_TWO);
});

module.exports = router;
