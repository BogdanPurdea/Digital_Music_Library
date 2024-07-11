var express = require('express');
var router = express.Router();
const albumController = require('../controllers/albumController');

/* GET albums listing. */
router.get('/albums', albumController.getAlbums);
router.get('/albums/:id', albumsController.getAlbumById);
router.post('/albums', albumsController.createAlbum);
router.put('/albums/:id', albumsController.updateAlbum);
router.delete('/albums/:id', albumsController.deleteAlbum);

module.exports = router;
