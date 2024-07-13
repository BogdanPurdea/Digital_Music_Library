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
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { 'albums.title': { $regex: query, $options: 'i' } },
                { 'albums.songs.title': { $regex: query, $options: 'i' } }
            ]
        });

        res.json(artists);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}