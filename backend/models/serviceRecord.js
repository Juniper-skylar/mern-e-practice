const mongoose = require('mongoose');

const serviceRecordSchema = new mongoose.Schema({
    recordNumber: {
        type: String,
        unique: true
    },
    car:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cars',
        required: true
    },
    service:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'services'
    },
    serviceDate:{
       type: Date,
       default: Date.now 
    }

},{ timestamps:true}
);
module.exports = mongoose.model("serviceRecord", serviceRecordSchema);