const payment = require('../models/Payment');
const mongoose = require('mongoose');

const createPayment = async(req,res) =>{
    try {
        const pay = await payment.create(req.body);
        return res.status(201).json({ message: "payment created successfully", payment});
    } catch (error) {
        console.log("error while creating payment", error);
        
    }
}

const generateBill = async(req, res) => {
    try {
        
        const { paymentId } = req.params;

        const bill = await Payment.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(paymentId)
                }
            },

            //Join service record

            {
                $lookup:{
                    from: 'servicerecords',
                    localField:'serviceRecord',
                    foreignField:'_id',
                    as:'record'
                }
            },
            { $unwind: "$record" },

            {
                $lookup: {
                    from:'cars',
                    localField: 'record.car',
                    foreignField: '_id',
                    as: 'car'
                }
            },

            { $unwind: '$car'},

            {
                $lookup: {
                    from: 'services',
                    localField: 'record.service',
                    foreignField: '_id',
                    as: 'service'
                }
            },

            { $unwind: '$service' },

            {
                $project: {
                    paymentNumber:1,
                    plateNumber: '$car.plateNumber',
                    model: '$car.model',
                    serviceName: '$service.serviceName',
                    servicePrice: '$service.serviePrice',
                    amountPaid: 1,
                    paymentDate: 1,   
                    balance: { $subtract: ['$service.servicePrice', '$amountPaid'] }
                }
            }
        ])

        res.json(bill[0]);

    } catch (error) {
        return res.status(500).json({ message: "error while generating bill", error});
        
    }
}


module.exports = {createPayment, generateBill};