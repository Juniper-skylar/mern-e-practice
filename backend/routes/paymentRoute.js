const createpayment = require('../controllers/paymentController');
const express = require ('express');
const router = express.Router();

router.post('/create-payment', createpayment);

module.exports = router;