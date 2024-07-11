const Artist = require('../models/artistModel');

//Get all artists
exports.getArtists = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get artist by id
exports.getArtistById = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found!' });
        }
        res.status(200).json(artist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Create a new artist
exports.createArtist = async (req, res) => {
    try {
        const artist = new Artist(req.body);
        await artist.save();
        res.status(201).json(artist);
    } catch (error) {
        res.status(400).json({ message: "Failed to create artist!: " + error.message });
    }
};

//Update an artist by id
exports.updateArtist = async (req, res) => {
    try {
        const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found!' });
        }
        res.status(200).json(artist);
    } catch (error) {
        res.status(400).json({ message: "Failes to update artist!: " + error.message });
    }
};

//Delete an artist by id
exports.deleteArtist = async (req, res) => {
    try {
        const artist = await Artist.findByIdAndDelete(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found!' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Failes to delete artist!: " + error.message });
    }
};

//Add an album to a artist
exports.addAlbumToArtist = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        artist.albums.push(req.body);
        await artist.save();
        res.status(201).json(artist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an album by ID
exports.updateAlbumById = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.artistId);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        const album = artist.albums.id(req.params.albumId);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        Object.assign(album, req.body);
        await artist.save();
        res.status(200).json(artist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an album by ID
exports.deleteAlbumById = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.artistId);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        const album = artist.albums.id(req.params.albumId);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        artist.albums.pull(album.id);
        await artist.save();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a song to an album
exports.addSongToAlbum = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.artistId);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        const album = artist.albums.id(req.params.albumId);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        album.songs.push(req.body);
        await artist.save();
        res.status(201).json(artist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a song by ID
exports.updateSongById = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.artistId);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        const album = artist.albums.id(req.params.albumId);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        const song = album.songs.id(req.params.songId);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        Object.assign(song, req.body);
        await artist.save();
        res.status(200).json(artist);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a song by ID
exports.deleteSongById = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.artistId);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        const album = artist.albums.id(req.params.albumId);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        const song = album.songs.id(req.params.songId);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        album.songs.pull(song.id);
        await artist.save();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};