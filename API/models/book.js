const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: {type: String, required:true},
    pageNumber:{type: Number, required:true},
    publisher: {type: String, required: true} ,
    publicationDate: {type: Date},
    //genre: {type: mongoose.Schema.Types.ObjectId, ref: 'Genre'} // Un libro tiene solo un genero
    genre: [{type: mongoose.Schema.Types.ObjectId, ref: 'Genre'}] // Un libro puede tener variios generos
    
})

module.exports = mongoose.model('Book', bookSchema);