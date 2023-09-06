const snake_scoreService = require('../services/snake_score.service');

module.exports = function (app) {
    app.get('/api/v1/snake_score', snake_scoreService.getAll);
    app.get('/api/v1/snake_score/:id', snake_scoreService.getOne);
    app.post('/api/v1/auth/snake_score', snake_scoreService.create);
    //app.put('/api/v1/auth/snake_score/:id', snake_scoreService.update);
    app.delete('/api/v1/auth/snake_score/:id', snake_scoreService.delete);
    app.get('/api/v1/snake_score/test/:id', snake_scoreService.rank);
};
