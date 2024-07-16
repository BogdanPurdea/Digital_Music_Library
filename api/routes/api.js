var express = require('express');
var router = express.Router();
const apiController = require('../controllers/apiController');
const searchController = require('../controllers/searchController');
const errorController = require('../controllers/errorController');

//Error routes
router.get('/not-found', errorController.GetNotFound);
router.get('/bad-request', errorController.GetBadRequest);
router.get('/server-error', errorController.GetServerError);

//Search routes
router.get('/search', searchController.searchArtists);
router.get('/search/albums', searchController.searchAlbums);
router.get('/search/songs', searchController.searchSongs);

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