const mongoose = require('mongoose');
const { Schema } = mongoose;
const Song = require('../models/songModel');

const albumSchema = new Schema ({
    title: { type: String, required: true },
    songs: [Song.schema],
    description: { type: String }
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;