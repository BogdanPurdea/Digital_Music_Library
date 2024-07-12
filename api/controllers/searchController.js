const Artist = require('../models/artistModel');

exports.searchArtists = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ message: 'Query parameter is required' });
        }

        // Perform a case-insensitive search in artist names, album titles and song titles
        const artists = await Artist.find({
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