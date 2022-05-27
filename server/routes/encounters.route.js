//Controller import
const EncountersController = require('../controllers/encounters.controller');

module.exports = function (app) {
    app.post('/api/encounters', EncountersController.create);
    app.get('/api/encounters', EncountersController.findAll);
    app.get('/api/encounters/:id', EncountersController.findOne);
    app.put('/api/encounters/:id', EncountersController.update);
    app.delete('/api/encounters/:id', EncountersController.delete);
}