const BookModel = require('../models/book');

exports.create = (req, res) =>{
    if(Object.entries(req.body).length == 0){
        return res.status(400).send({
            message: 'Todos los campos son obligatorios.'
        })
    }

    const book = new BookModel({
        name: req.body.name,
        author: req.body.author,
        pageNumber: req.body.pageNumber,
        publisher: req.body.publisher,
        publicationDate: req.body.publicationDate,
        genre: req.body.genre
    })

    book.save()
    .then((dataBook) =>{
        res.send(dataBook)
    })
    .catch((error) =>{
        return res.status(500).send({
            message: error.send
        })
    })
    

}

exports.update = (req, res) =>{
    if(Object.entries(req.body).length == 0){
        return res.status(400).send({
            message: 'Todos los campos son obligatorios.'
        })
    }
    
    const book = {
        name: req.body.name,
        author: req.body.author,
        pageNumber: req.body.pageNumber,
        publisher: req.body.publisher,
        publicationDate: req.body.publicationDate,
        genre: req.body.genre
    }

    BookModel.findByIdAndUpdate(req.params.id, book, {new: true} )
    .then((bookUpdate) => {
        res.send(bookUpdate)
    })
    .catch((error) => {
        return res.status(500).send({
            message: error.message
        })
    })
}

exports.getAll = (req, res) =>{
    BookModel.find()
        .populate('genre')
        .exec()
        .then( (books) => res.send(books))
        .catch(
            (error) =>{
                res.status(500).send({
                    message: error.message
                })
            }
        )
}

exports.getOne = (req, res) =>{
    BookModel.findById(req.params.id)
    .populate('genre')
    .exec()
    .then((book) => {res.send(book)})
    .catch(
        (error) => {
            res.status(500).send({
                message: error.message
            })
        }
    )

}

exports.deleteOne = (req, res) =>{
    BookModel.findByIdAndRemove(req.params.id)
        .then((book) => {res.send(book)})
        .catch(
            (error) =>{
                res.status(500).send({
                    message: error.message
                })
            }
        )
}