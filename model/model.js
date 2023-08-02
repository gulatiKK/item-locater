const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique: true
    },
    discription: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String,
        enum: ['container', 'object']
    }
})

module.exports = mongoose.model('Data', dataSchema)