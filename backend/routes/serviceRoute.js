const insertService = require('../controllers/serviceController');
const express = require('express');
const router = express.Router();

router.post('/register-service', insertService);

module.exports = router;