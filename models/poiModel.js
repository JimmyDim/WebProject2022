const mongoose = require('mongoose')
//const validator = require('validator')

const poiSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,

    },
    address: {
        type: String,
        required: true,
    },
    types: [{
        type: String,
        required: true,

    }],
    coordinates: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    },
    rating: {
        type: Number,
        required: true,
    },
    rating_n: {
        type: Number,
        required: true,
    },
    international_phone_number: {
        type: Number,
        required: true,
    },
    time_spent: [{
        type: Number,
        required: true,
    }],
    current_popularity: {
        type: Number,
        required: true,
    },
    populartimes: [{
        name: {
            type: String
        },
        data: [{
            type: Number
        }]
    }]
})

const Poi = mongoose.model('Poi', poiSchema);
module.exports = Poi;