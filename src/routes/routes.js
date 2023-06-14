const express = require('express');
const router = express.Router();

// Controller
const {
    exampleFunction,
} = require('../controllers/controller');

router.get('/exampleRoute', exampleFunction);

module.exports = router