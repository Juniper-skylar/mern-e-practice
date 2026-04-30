const {registerCar, getAllCars} = require('../controllers/carController');
const express = require('express');
const router = express.Router();

router.post('/register-car', registerCar);
router.get('/getAllCars', getAllCars)

module.exports = router;