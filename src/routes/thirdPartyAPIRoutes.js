const express = require('express');
const router = express.Router();

// Controller
const {
    generateWordCloud,
    translateLanguage,
} = require('../controllers/thirdPartyAPIController');

router.post('/generateWordCloud/:content_id?', generateWordCloud);
router.post('/translateLanguage', translateLanguage);


module.exports = router