var express = require('express');
var router = express.Router();
const artistsController = require('../controllers/artistsController');

/* GET artists listing. */
router.get('/artists', artistsController.getArtists);

module.exports = router;
