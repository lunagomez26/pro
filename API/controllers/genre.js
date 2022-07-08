const GenreModel = require('../models/genre');

//Metodo para almacenar un nuevo genero
// @param {*} req => Todo lo que enviamos desde el body (formulario);
// @param {*} res => La respuesta que devolverá
exports.create = (req, res) =>{
    if(Object.entries(req.body).length == 0){
        return res.status(400).send({
            message: 'Todos los campos son obligatorios.'
        })
    }

    const genre = new GenreModel({
        name: req.body.name,
        status: req.body.status
    })

    genre.save()
    .then((dataGenre) =>{
        res.send(dataGenre)
    }).catch((error) =>{
        return res.status(500).send({
            message: error.message
        })
    })
}

exports.update = (req, res) =>{
    if(Object.entries(req.body).length == 0){
        return res.status(400).send({
            message: 'Todos los campos son obligatorios.'
        })
    }

    const genre = {
        name: req.body.name,
        status: req.body.status
    }

    GenreModel.findByIdAndUpdate(req.params.id, genre, {new: true} )
    .then((genreUpdate) =>{
        res.send(genreUpdate)
    })
    .catch((error) =>{
        return res.status(500).send({
            message: error.send
        })
    })
}

exports.getAll = (req, res) =>{
    GenreModel.find()
    .then((genres) =>{
        res.send(genres)
    })
    .catch((error) =>{
        return res.status(500).send({
            message: error.send
        })
    })
}

exports.getOne = (req, res) =>{
    GenreModel.findById(req.params.id)
    .then((genre) =>{
        res.send(genre)
    })
    .catch((error) =>{
        return res.status(500).send({
            message: error.send
        })
    })
}