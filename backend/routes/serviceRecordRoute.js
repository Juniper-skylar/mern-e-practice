const express = require('express');
const router = express.Router();
const {
    insertServiceRecord,
    getServiceRecord,
    getServiceRecordById,
    updateServiceRecordById,
    deleteServiceRecordById
     } = require('../controllers/serviceRecordController');

router.post('/insertservicerecord', insertServiceRecord);
router.get('/getservicerecords', getServiceRecord);
router.get('/getservicerecordbyid/:id', getServiceRecordById);
router.put('/updateservicerecordbyid/:id', updateServiceRecordById);
router.delete('/deleteservicerecordbyid/:id', deleteServiceRecordById);

module.exports = router;