const mongoose = require('mongoose');

const carSchema = new mongoose.Schema ({
    plateNumber:{
        type:String,
        required:true,
        trim: true
    },
    type:{
        type:String,
        required:true

    },
    model:{
        type:String,
        required:true
    },
    manufacturingYear:{
        type:String,
        required:true
    },
    driverPhone:{
        type:Number,
        required:true
    },
    mechanicName:{
        type:String,
        required:true
    }

},{timestamps:true});
 const car = mongoose.model("cars",carSchema);
 module.exports = car;