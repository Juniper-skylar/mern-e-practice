const service = require("./models/Service");
const connectDB = require('./config/dbConnection');
const { default: mongoose } = require("mongoose");


connectDB();

const data = [
    {
        serviceCode: "ENG001",
        serviceName:"Engine Repair",
        servicePrice: "150,000"
    },

    {
        serviceCode: "TR001",
        serviceName:"Transmission Repair",
        servicePrice: "80,000"
    },

    {
        serviceCode: "OIL001",
        serviceName:"oil change",
        servicePrice: "60,000"
    },

    {
        serviceCode: "CH001",
        serviceName:"chain replacement",
        servicePrice: "40,000"
    },

    {
        serviceCode: "WH001",
        serviceName: "wheel replacement",
        servicePrice: "5,000"
    } 
];

const insertTestData = async(req, res) => {
    try {

        await service.deleteMany();
        await service.insertMany(data);

        console.log("test data inserted");

        mongoose.connection.close();
    } catch (error) {
        console.log("error while inserting test data", error);
    }
};

insertTestData();