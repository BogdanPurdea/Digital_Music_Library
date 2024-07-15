const Artist = require('../models/artistModel');

exports.searchArtists = async (req, res) => {
    try {
        const query = req.query.q;
        let artists;
        if (!query) {
            artists = await Artist.find();
        }

        // Perform a case-insensitive search in artist names, album titles and song titles
        artists = await Artist.find({
            name: { $regex: query, $options: 'i' }
        });

        res.json(artists);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.searchAlbums = async (req, res) => {
    try {
        const query = req.query.q;
        let albums;
        if (!query) {
            albums = await Artist.aggregate([
                { $unwind: '$albums' },
                {
                    $project: {
                        _id: 0,
                        artistId: '$_id',
                        artistName: '$name', // Preserve artist name
                        album: '$albums' // Project the albums field
                    }
                }
            ]);
        }

        // Perform a case-insensitive search in artist names, album titles and song titles
        albums = await Artist.aggregate([
            { $unwind: '$albums' }, // Unwind to deconstruct the albums array
            {
                $match: {
                    'albums.title': { $regex: query, $options: 'i' } // Match albums by title
                }
            },
            {
                $project: {
                    _id: 0,
                    artistId: '$_id',
                    artistName: '$name', // Preserve artist name
                    album: '$albums' // Project the albums field
                }
            }

        ]);
        res.json(albums);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.searchSongs = async (req, res) => {
    try {
        const query = req.query.q;
        let songs;
        if (!query) {
            songs = await Artist.aggregate([
                { $unwind: '$albums' }, // Unwind to deconstruct the albums array
                { $unwind: '$albums.songs' }, // Unwind to deconstruct the songs array within each album;

                {
                    $project: {
                        _id: 0, // Exclude the default _id field
                        artistId: '$_id',
                        artistName: '$name', // Preserve artist name
                        albumId: '$albums._id',
                        albumName: '$albums.title', // Preserve album title
                        song: '$albums.songs' // Project the songs field
                    }
                }]);
        }


        // Perform a case-insensitive search in artist names, album titles and song titles
        songs = await Artist.aggregate([
            { $unwind: '$albums' }, // Unwind to deconstruct the albums array
            { $unwind: '$albums.songs' }, // Unwind to deconstruct the songs array within each album
            {
                $match: {
                    'albums.songs.title': { $regex: query, $options: 'i' } // Match songs by title
                }
            },
            {
                $project: {
                    _id: 0, // Exclude the default _id field
                    artistId: '$_id',
                    artistName: '$name', // Preserve artist name
                    albumId: '$albums._id',
                    albumName: '$albums.title', // Preserve album title
                    song: '$albums.songs' // Project the songs field
                }
            }
        ]);

        res.json(songs);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
