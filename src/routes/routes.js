const path = require("path");
const express = require('express');
const router = express.Router();

// Controller
const {
    exampleFunction,
} = require('../controllers/controller');

// Import the dev users route
const devUserRoutes = require(path.join(__dirname, "dev_user_routes"));
const commentRoutes = require(path.join(__dirname, "comment_routes"));
const UserRoutes = require(path.join(__dirname, "user_routes"));

router.get('/exampleRoute', exampleFunction);

// Group the dev users route into this endpoint
router.use("/dev-users", devUserRoutes);
router.use("/comments", commentRoutes);

// Group the dev users route into this endpoint
router.use("/users", UserRoutes);


module.exports = router