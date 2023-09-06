const bookService = require('../services/book.service');

module.exports = function (app) {
    app.get('/api/v1/books', bookService.getAll);
    app.get('/api/v1/books/:id', bookService.getOne);
    app.post('/api/v1/auth/books', bookService.create);
    app.put('/api/v1/auth/books/:id', bookService.update);
    app.delete('/api/v1/auth/books/:id', bookService.delete);
};
