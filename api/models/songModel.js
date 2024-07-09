const mongoose = require('mongoose');
const { Schema } = mongoose;

const songSchema = new Schema ({
    title: { type: String, required: true },
    length: { type: String, required: true }
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;