const mongoose = require('mongoose')

const visitSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,

    },
    poiId: {
        type: String,
        required: true,
    },
    crowd_estimate: {
        type: Number,
        //required: true,
    },
    positive: {
        type: String,
        default: 'negative',
    }
}, {
    timestamps: true
})

const Visit = mongoose.model('Visit', visitSchema);
module.exports = Visit;