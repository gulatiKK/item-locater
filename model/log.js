const mongoose = require('mongoose');

const relationSchema = new mongoose.Schema({
    userName: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('Log', relationSchema);