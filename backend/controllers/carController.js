const car = require('../models/Car');

const registerCar = async (req,res) =>{

     try {
        const user = await car.create(req.body);
        return res.status(201).json({ message:"data inserted" ,user});

    } catch (error) {
        console.log("error while inserting car", error);
     }
}

const getAllCars = async (req,res) =>{

     try {
        const cars = await car.find();
        return res.status(200).json({ message:"data retrieved" ,cars});

    } catch (error) {
        console.log("error while inserting car", error);
     }
}

module.exports = {registerCar, getAllCars};