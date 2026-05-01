const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentNumber:{
        type:String,
        required:true
    },
    serviceRecord:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"serviceRecord"
    },
    amountPaid:{
        type:Number,
        required:true
    },
    paymentDate:{
       type: Date,
       default: Date.now
    }
}, {timestamps:true});

const payment = mongoose.model("payment", paymentSchema);
module.exports = payment;