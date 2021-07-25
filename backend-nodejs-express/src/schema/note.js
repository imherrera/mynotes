const mongoose = require('mongoose');

const note = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: String,
    owner_name: String,
    text: String,
    creation_date: String,
    edition_date: String,
    relevance: Number,
    title: String,
});

module.exports = mongoose.model("Note", note);