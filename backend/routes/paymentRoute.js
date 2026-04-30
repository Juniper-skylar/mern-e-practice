const {createpayment, generateBill} = require('../controllers/paymentController');
const express = require ('express');
const router = express.Router();

router.post('/create-payment', createPayment);
router.get('/generate-bill/:paymentId', generateBill);

module.exports = router;