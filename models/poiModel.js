const mongoose = require('mongoose')
//const validator = require('validator')

const poiSchema = new mongoose.Schema({

    type: {
        type: String,
        enum: ['Feature']
        //required: true
    },
    properties: {
        description: {
            type: String,
        }
        //required: true,
    },
    coordinates: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    },
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            //required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    name: {
        type: String,
        //required: true,

    },
    address: {
        type: String,
        // required: true,
    },
    types: {
        type: [String],
        // required: true,

    },
    rating: {
        type: Number,
        //required: true,
    },
    rating_n: {
        type: Number,
        //required: true,
    },
    international_phone_number: {
        type: String,
        //required: true,
    },
    time_spent: [{
        type: Number,
        // required: true,
    }],
    current_popularity: {
        type: Number,
        // required: true,
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