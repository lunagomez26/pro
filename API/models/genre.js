const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {type: String, require: true},
    status: {type: Boolean, require: true},
    //Campos Boolean 
    //1 => False
    // 0 => True
})

module.exports = mongoose.model('Genre', genreSchema);