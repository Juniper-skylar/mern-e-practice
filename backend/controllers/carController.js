const car = require('../models/Car');

const registerCar = async (req,res) =>{

     try {
        const user = await car.create(req.body);
        return res.status(201).json({ message:"data inserted" ,user});

    } catch (error) {
        console.log("error while inserting car", error);
     }
}

module.exports = registerCar;