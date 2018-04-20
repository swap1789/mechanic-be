var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageName: String,
    subTypes: [{
        type: Schema.Types.ObjectId,
        ref: 'jobsubtype'
    }]
});

JobTypeSchema.methods = {
    toJson: function() {
      var obj = this.toObject()
      return obj;
    }
}

module.exports = mongoose.model('jobtype', JobTypeSchema);