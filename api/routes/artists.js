var express = require('express');
var router = express.Router();
const path = require('path');

/* GET artists listing. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../data', 'data.json'));
});

module.exports = router;
