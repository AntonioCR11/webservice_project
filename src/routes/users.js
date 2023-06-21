const express = require("express");
const router = express.Router();
const{
    getUser,
} = require("../controllers/UserController");

router.get("/users", getUser);

module.exports = router;