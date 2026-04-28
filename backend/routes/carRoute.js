const registerCar = require('../controllers/carController');
const express = require('express');
const router = express.Router();

router.post('/register-car', registerCar);

module.exports = router;