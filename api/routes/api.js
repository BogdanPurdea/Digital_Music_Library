var express = require('express');
var router = express.Router();
const apiController = require('../controllers/apiController');
const searchController = require('../controllers/searchController');

//Search route
router.get('/search', searchController.searchArtists);

// Artist routes
router.get('/', apiController.getArtists);
router.get('/:id', apiController.getArtistById);
router.post('/', apiController.createArtist);
router.put('/:id', apiController.updateArtist);
router.delete('/:id', apiController.deleteArtist);

// Album routes
router.post('/:id/albums', apiController.addAlbumToArtist);
router.put('/:artistId/albums/:albumId', apiController.updateAlbumById);
router.delete('/:artistId/albums/:albumId', apiController.deleteAlbumById);

// Song routes
router.post('/:artistId/albums/:albumId/songs', apiController.addSongToAlbum);
router.put('/:artistId/albums/:albumId/songs/:songId', apiController.updateSongById);
router.delete('/:artistId/albums/:albumId/songs/:songId', apiController.deleteSongById);

module.exports = router;