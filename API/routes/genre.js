module.exports = (app) => {
    const genre = require('../controllers/genre');

    app.post('/genre/create', genre.create);
    app.put('/genre/update/:id', genre.update);
    app.get('/genre/getAll', genre.getAll);
    app.get('/genre/getOne/:id', genre.getOne);
}