var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobSubTypeSchema = new Schema({
    subtypename: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('jobsubtype', JobSubTypeSchema);