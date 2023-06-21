const path = require('path');
const router = require("express").Router();
const multer = require('multer');
const upload = multer({
    dest: path.join(__dirname, "..", "public", "images"),
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg" ) {
            return cb(new Error("File type not valid!", false));
        }
        
        cb(null, true)
    },
    limits: {
        fileSize: 20000000
    }
});

const commentController = require(path.join(__dirname, "..", "controllers", "comment_controller"));
const replyController = require(path.join(__dirname, "..", "controllers", "reply_controller"));
// Comment
router.post("/$", upload.single("image"), commentController.createComment);
router.get("/$", commentController.getComments);
router.get("/:commentId", commentController.getSpecificComment);
router.put("/:commentId", upload.single("image"), commentController.updateComment);
router.delete("/:commentId", commentController.deleteComment);
router.get("/search", commentController.searchComment);
// Reply
router.get("/:commentId/replies", replyController.getCommentReplies);
router.put("/:commentId/replies/:replyId", replyController.updateCommentReplies);
router.delete("/:commentId/replies/:replyId", replyController.deleteCommentReplies);
router.post("/:commentId/replies", upload.single("image"), replyController.createCommentReply);
module.exports = router;