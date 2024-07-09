const mongoose = require('mongoose');
const { Schema } = mongoose;
const Album = require('../models/albumModel');

const artistSchema = new Schema ({
    name: { type: String, required: true },
    albums: [Album.schema]
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;