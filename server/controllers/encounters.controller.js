//Imports model
const { Encounters } = require('../models/encounters.model');

module.exports = {

    //Create
    create: (req, res) => {
        console.log(req.body);
        Encounters.create(req.body)
            .then(newEncounter => res.json(newEncounter))
            .catch(err => res.status(400).json(err));
    },

    //Read all
    findAll: (req, res) => {
        Encounters.find()
            .then(encounters => res.json(encounters))
            .catch(err => res.json(err));
    },

    //Read one
    findOne: (req, res) => {
        Encounters.findById(req.params.id)
            .then(encounter => res.json(encounter))
            .catch(err => res.json(err));
    },

    //Update
    update: (req, res) => {
        console.log("Update ID: ", req.params.id);
        console.log("Update Obj: ", req.body)
        Encounters.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true
        })
            .then(updatedPirate => res.json(updatedPirate))
            .catch(err => res.json(err));
    },

    //Delete
    delete: (req, res) => {
        Encounters.findByIdAndDelete(req.params.id)
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }
}
