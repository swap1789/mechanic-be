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

JobSubTypeSchema.methods = {
    toJson: function() {
        var obj = this.toObject()
        delete obj.password;
        return obj;
    }
}

module.exports = mongoose.model('jobsubtype', JobSubTypeSchema);