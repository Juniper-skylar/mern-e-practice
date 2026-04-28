const { model } = require('mongoose');
const serviceRecord = require('../models/serviceRecord');

const insertServiceRecord = async(req, res) => {
    try{
        const i_service = await serviceRecord.create(req.body);
        return res.status(201).json({ message: "service record is inserted", i_service});

    } catch(error){
        console.log("error occurred while inserting service record", error);
    }
}

const getServiceRecord = async(req, res) => {
    try {
        const getServiceRecords = await serviceRecord.find()
        .populate('car')
        .populate('service');
       
        return res.status(200).json({ message: "service records retrieved", getServiceRecords}); 
    } catch (error) {
        return res.status(500).json({ message: "error while retrieving data", error});
    }
}

const getServiceRecordById = async(req, res) => {
    try {
        const getServiceRecordById = await serviceRecord.findById(req.params.id)
        .populate('car')
        .populate('service');
       
        return res.status(200).json({ message: "service record retrieved", getServiceRecordById}); 
    } catch (error) {
        return res.status(500).json({ message: "error while retrieving data", error});
    }
}

const updateServiceRecordById = async(req, res) => {
    try {
        const updateServiceRecord = await serviceRecord
        .findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        .populate('car')
        .populate('service');

        return res.status(200).json({success:true, message: "service record updated", updateServiceRecord}); 

    } catch (error) {
        return res.status(500).json({ message: "error while updating record", error});
    }
}

const deleteServiceRecordById = async(req, res) => {
    try {
        const deleteServiceRecord = await serviceRecord.findByIdAndDelete(req.params.id);
       
        return res.status(200).json({ success: true, message: "service record deleted"});
    } catch (error) {
        return res.status(500).json({ message: "error while deleting record", error });
    }
}


module.exports = {
    insertServiceRecord,
    getServiceRecord,
    getServiceRecordById,
    updateServiceRecordById,
    deleteServiceRecordById 
};