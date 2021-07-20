const mongoose = require('mongoose');

const note = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner: String,
    tex: String,
    
});

module.exports = mongoose.model("Note", note);