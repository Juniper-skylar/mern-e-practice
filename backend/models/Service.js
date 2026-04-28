const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    serviceCode:{
        type:String,
        unique: true
    },
    serviceName:{
        type:String,
        required:true
    },
    servicePrice:{
        type:String,
        required:true
    }
}, {timestamps:true});

const service = mongoose.model("services", serviceSchema);
module.exports = service; 