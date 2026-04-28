const payment = require('../models/Payment');

const createPayment = async(req,res) =>{
    try {
        const pay = await payment.create(req.body);
        return res.status(201).json({ message: "payment created successfully", payment});
    } catch (error) {
        console.log("error while creating payment", error);
        
    }
}


module.exports = createPayment;