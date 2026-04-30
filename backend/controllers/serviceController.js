const service = require('../models/Service');

const insertService = async(req,res) =>{
    try {
        const insert_service = await service.create(req.body);
        return res.status(201).json({messsage:"the service is inserted",insert_service})
    } catch (error) {
        console.log("error while inserting the service ", error);
    }
}

const getAllServices = async(req,res) =>{
    try {
        const get_services = await service.find();
        return res.status(200).json({message:"services are retrieved",get_services})
    } catch (error) {
        console.log("error while retrieving services", error);
    }
}

module.exports = {insertService, getAllServices};