const path = require('path');
const router = require("express").Router();

const UserController = require(path.join(__dirname, "..", "controllers", "UserController"));

router.post("/register", UserController.addUser);
router.post("/login", UserController.userLogin);
router.post("/subs", UserController.subsTier);
router.put("/:username", UserController.updateUser);
router.delete("/:username", UserController.deleteUser);
router.post("/topup", UserController.userTopup);
router.post("/:userId/likes",UserController.toggleLike);

module.exports = router;