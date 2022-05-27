const mongoose = require('mongoose');

const EncountersSchema = new mongoose.Schema({
    encounterName: {
        type: String
    },
    encounterMonsters: {
        type: Array
    },
    summary: {
        type: String
    },
    description: {
        type: String
    },
    rewards: {
        type: String
    },
    campaign: {
        type: String
    },
    party: {
        type: Array
    },
    avgLevel: {
        type: Number
    },
    difficulty: {
        type: String
    },
    exp: {
        type: Number
    },
    adjExp: {
        type: Number
    }
}, {timestamps: true});

module.exports.Encounters = mongoose.model('Encounters', EncountersSchema);