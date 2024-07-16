var express = require('express');
var router = express.Router();
const apiController = require('../controllers/apiController');
const searchController = require('../controllers/searchController');
const errorController = require('../controllers/errorController');

//Search routes
router.get('/search', searchController.searchArtists);
router.get('/search/albums', searchController.searchAlbums);
router.get('/search/songs', searchController.searchSongs);

// Artist routes
router.get('/artists', apiController.getArtists);
router.get('/artists/:id', apiController.getArtistById);
router.post('/artists', apiController.createArtist);
router.put('/artists/:id', apiController.updateArtist);
router.delete('/artists/:id', apiController.deleteArtist);

// Album routes
router.post('/:id/albums', apiController.addAlbumToArtist);
router.put('/:artistId/albums/:albumId', apiController.updateAlbumById);
router.delete('/:artistId/albums/:albumId', apiController.deleteAlbumById);

// Song routes
router.post('/:artistId/albums/:albumId/songs', apiController.addSongToAlbum);
router.put('/:artistId/albums/:albumId/songs/:songId', apiController.updateSongById);
router.delete('/:artistId/albums/:albumId/songs/:songId', apiController.deleteSongById);

//Error routes
router.get('/not-found', errorController.GetNotFound);
router.get('/bad-request', errorController.GetBadRequest);
router.get('/server-error', errorController.GetServerError);

module.exports = router;