const express = require('express');
const router = express.Router();

// Controller
const {
    generateWordCloud,
} = require('../controllers/thirdPartyAPIController');

router.post('/generateWordCloud', generateWordCloud);


module.exports = router