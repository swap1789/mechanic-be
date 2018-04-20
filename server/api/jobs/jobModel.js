var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
    customerName: {
        type: String,
        required: true
    },
    location: String,
    phoneNumber: {
        type: Number,
        required: true
    },
    complaint: {
        type: String,
        required: true
    },
   status: {
       type: String,
       required: true
   },
   carImage: String,
   assignedTo: { 
       type: Schema.Types.ObjectId,
       ref: 'mechanic'
   },
   jobType: [{
    type: Schema.Types.ObjectId,
    ref: 'jobtype'
   }]
});

jobSchema.methods = {
   toJson: function() {
        var obj = this.toObject()
        delete obj.password;
        return obj;
    }
}

module.exports = mongoose.model('job', jobSchema);