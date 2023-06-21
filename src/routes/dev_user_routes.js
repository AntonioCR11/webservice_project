const path = require('path');
const router = require("express").Router();

const devUserController = require(path.join(__dirname, "..", "controllers", "dev_user_controller"));

router.get("/:userId/comments", devUserController.getUserComments);
router.get("/:userId/replies",  devUserController.getUserReplies);
router.get("/:userId/replies/received",  devUserController.getReceivedReplies);
router.get("/:userId/comments-and-replies",  devUserController.getUserCommentsAndReplies);
router.get("/:userId/likes",  devUserController.getUserLikes);
router.get("/:userId",  devUserController.getUser);
router.post("/$",  devUserController.createUser);
router.put("/:userId",  devUserController.updateUser);
router.delete("/:userId",  devUserController.deleteUser);

module.exports = router;