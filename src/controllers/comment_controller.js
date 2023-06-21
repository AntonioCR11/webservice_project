const path = require("path");
const joi = require("joi");
const { Op } = require("sequelize");

const db = require(path.join(__dirname, "..", "models"));
const PaginationUtil = require(path.join(__dirname, "..", "utils", "pagination"))

const commentController = {
    /**
     * Create a comment that is associated with a content, and a user.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing the operation status and message.
     */
    createComment: async (req, res) => {
        const {
            content_id,
            content_url,
            parent_id,
            dev_user_id,
            body,
            is_reaction
        } = req.body;

        // Validate request body
        const validateSchema = joi.object({
            "content_id": joi.string().required(),
            "content_url": joi.string().required(),
            "parent_id": joi.number(),
            "dev_user_id": joi.number().required(),
            "body": joi.string().required(),
            "is_reaction": joi.number().required(),
        });
        const validateResult = validateSchema.validate(req.body);
        if (validateResult.error) return res.status(422).send({
            statusCode: 422,
            message: validateResult.error.message
        });

        // Check if the request include an image
        if (req.file == undefined) {
            // Create a text-based comment
            const newComment = db.Comment.build({
                content_id,
                content_url,
                parent_id,
                dev_user_id,
                body,
                is_reaction,
            });

            await newComment.save();

            return res.status(201).send({
                statusCode: 201,
                message: "Success",
                comment: newComment
            });
        }
        else {
            // TODO: Create an image based comment
            // WARNING: If it is an image, make sure that the is_reaction is = 1,
            //          or if you want to, you can set it by default to be 1 to indicate it is a picture
            console.log(req.file);
        }
    },
    
    /**
     * Get a list of comments from the database, including replies.
     * 
     * The list of the comments are paginated and if `page` and `limit` query params is not set, it
     * will default to the first page and limit it at max 30 rows.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing a max page for the pagination, as well as the list of comments and replies.
     */
    getComments: async (req, res) => {
        // TODO: Get a list of paginated comments.

        return res.status(200).send({
            maxPage: 1,
            comments: []
        });
    },
    
    /**
     * Get a specific comment from the database using their id.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing the model of the comment.
     */
    getSpecificComment: async (req, res) => {
        // TODO: Get a comment with the specified id.

        return res.status(200).send();
    },
    
    /**
     * Updates a comment based on the id.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing the new updated model of the comment.
     */
    updateComment: async (req, res) => {
        const { commentId } = req.params;
        console.log(req.params);

        // Validate id of the comment
        const idSchema = joi.object({
            "commentId": joi.number().required(),
        });
        const idResult = idSchema.validate(req.params);
        if (idResult.error) {
            return res.status(422).send({
                statusCode: 422,
                message: idResult.error.message
            });
        }

        const {
            content_id,
            content_url,
            parent_id,
            dev_user_id,
            body,
            is_reaction
        } = req.body;

        // Validate request body
        const validateSchema = joi.object({
            "content_id": joi.string().required(),
            "content_url": joi.string().required(),
            "parent_id": joi.number(),
            "dev_user_id": joi.number().required(),
            "body": joi.string().required(),
            "is_reaction": joi.number().required(),
        });
        const validateResult = validateSchema.validate(req.body);
        if (validateResult.error) return res.status(422).send({
            statusCode: 422,
            message: validateResult.error.message
        });

        // Check if an image is supplied with the image file or not
        if (req.file == undefined) {
            // Create a text-based comment
            const targetedComment = await db.Comment.findByPk(Number(commentId));

            targetedComment.content_id = content_id,
            targetedComment.content_url = content_url,
            targetedComment.parent_id = parent_id,
            targetedComment.dev_user_id = dev_user_id,
            targetedComment.body = body,
            targetedComment.is_reaction = is_reaction,

            await targetedComment.save();

            return res.status(200).send({
                statusCode: 200,
                message: "Success",
                comment: targetedComment
            });
        }
        else {
            // TODO: Create an image based comment
            // WARNING: If it is an image, make sure that the is_reaction is = 1,
            //          or if you want to, you can set it by default to be 1 to indicate it is a picture
            console.log(req.file);
        }
    },
    
    /**
     * Soft delete a comment from the database.
     * 
     * A soft deleted comment will still be discoverable, however is flagged that this
     * comment is no longer needed to be shown.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing the soft deleted model of the comment.
     */
    deleteComment: async (req, res) => {
        // TODO: Soft delete a comment.

        return res.status(200).send();
    },
    
    /**
     * Search for a comment for a database based on a keyword.
     * 
     * If any of the comment in the database includes the keyword, it will be included in the list returned
     * by this endpoint.
     * 
     * The list of the comments are paginated and if `page` and `limit` query params is not set, it
     * will default to the first page and limit it at max 30 rows.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing the soft deleted model of the comment.
     */
    searchComment: async (req, res) => {
        // TODO: Get a list of paginated searched comments.

        return res.status(200).send({
            maxPage: 1,
            comments: []
        });
    }
}

module.exports = commentController;