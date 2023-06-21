const path = require('path');
const router = require("express").Router();

const UserController = require(path.join(__dirname, "..", "controllers", "UserController"));

router.post("/register", UserController.addUser);
router.post("/login", UserController.userLogin);
router.put("/:username", UserController.updateUser);
router.delete("/:username", UserController.deleteUser);

module.exports = router;