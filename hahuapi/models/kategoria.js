const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const kategoriaSchema = new Schema({
    _id: Number,
    kategoria: {
        type: Number,
        default: 1,
    },
    nev: {
        type: String,
        required: true,
        unique: true,
        maxlength: 30
    }
});

module.exports = mongoose.model('Kategoria',kategoriaSchema,'kategoriak');

