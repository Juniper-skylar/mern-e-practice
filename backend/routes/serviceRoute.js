const { insertService,getAllServices } = require('../controllers/serviceController');
const express = require('express');
const router = express.Router();

router.post('/register-service', insertService);
router.get('/getAllServices', getAllServices);

module.exports = router;