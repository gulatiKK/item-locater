const mongoose = require('mongoose');

const relationSchema = new mongoose.Schema({
    item_name: {
        required: true,
        type: String,
        unique: true
    },
    container_name: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Relation', relationSchema)