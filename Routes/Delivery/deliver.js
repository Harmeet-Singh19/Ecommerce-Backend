const express = require('express');
const router = express.Router();
const { sendData } = require('../../Controllers/Delivery/delivery')

router.get('/rates', sendData);


module.exports = router;