const path = require("path");
const joi = require("joi");
const { Op } = require("sequelize");

const db = require(path.join(__dirname, "..", "models"));
const PaginationUtil = require(path.join(__dirname, "..", "utils", "pagination"))
const JWT_KEY = 'KELOMPOK_OP';
const jwt = require("jsonwebtoken");
const devUserController = {
    /**
     * Get all comments that belongs to a certain dev user.
     * 
     * The list of the comments are paginated and if a `page` and `limit` query params is not set, it
     * will default to the first page and limit it at max 30 rows.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing a max page for the pagination, as well as the list of comments.
     */
    getUserComments: async (req, res) => {
        const { userId } = req.params;

        const paramsSchema = joi.object({
            userId: joi.number().required(),
        });
        let validateResult = paramsSchema.validate(req.params);
        if (validateResult.error) {
            return res.status(422).send({
                message: validateResult.error.message
            });
        }

        const pagination = await PaginationUtil.getPaginatedModels(req, {
            where: {
                "dev_user_id": userId,
                "parent_id": null
            }
        }, db.Comment);

        return res.status(200).send({
            maxPage: pagination.maxPage,
            comments: pagination.models
        });
    },
    
    /**
     * Get all comment replies that belongs to a certain dev user.
     * 
     * The list of the replies are paginated and if `page` and `limit` query params is not set, it
     * will default to the first page and limit it at max 30 rows.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing a max page for the pagination, as well as the list of replies.
     */
    getUserReplies: async (req, res) => {
        const { userId } = req.params;

        const paramsSchema = joi.object({
            userId: joi.number().required(),
        });
        let validateResult = paramsSchema.validate(req.params);
        if (validateResult.error) {
            return res.status(422).send({
                message: validateResult.error.message
            });
        }

        const pagination = await PaginationUtil.getPaginatedModels(req, {
            where: {
                "dev_user_id": userId,
                "parent_id": {
                    [Op.not]: null
                }
            }
        }, db.Comment);
        
        return res.status(200).send({
            maxPage: pagination.maxPage,
            comments: pagination.models
        });
    },
    
    /**
     * Get all comment replies that is received by a certain dev user.
     * 
     * The list of the replies are paginated and if `page` and `limit` query params is not set, it
     * will default to the first page and limit it at max 30 rows.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing a max page for the pagination, as well as the list of replies.
     */
    getReceivedReplies: async (req, res) => {
        const { userId } = req.params;

        const paramsSchema = joi.object({
            userId: joi.number().required(),
        });
        let validateResult = paramsSchema.validate(req.params);
        if (validateResult.error) {
            return res.status(422).send({
                message: validateResult.error.message
            });
        }

        // Get all comments that have been made by the user.
        const commentIds = await db.Comment.findAll({
            attributes: ["id"],
            where: {
                "dev_user_id": userId,
                "parent_id": null
            }
        });

        // Reformat the array to only include the id numbers instead of the object.
        const ids = [];
        for (let i = 0; i < commentIds.length; i++) {
            ids.push(commentIds[i].id);
        }

        console.log(ids);

        // Get all replies that targets this specific ids.
        const pagination = await PaginationUtil.getPaginatedModels(req, {
            where: {
                "parent_id": {
                    [Op.in]: ids
                }
            },
            order: [
                ["created_at", "DESC"]
            ]
        }, db.Comment);

        return res.status(200).send({
            maxPage: pagination.maxPage,
            comments: pagination.models
        });
    },

    /**
     * Get all the comments and replies that belonged to a certain user.
     * 
     * The list of the replies are paginated and if `page` and `limit` query params is not set, it
     * will default to the first page and limit it at max 30 rows.
     * 
     * The list of comments and replies is blended together in a single list and sorted based on the **timeframe** it was created.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing a max page for the pagination, as well as the list of comments and replies.
     */
    getUserCommentsAndReplies: async (req, res) => {
        const { userId } = req.params;

        const paramsSchema = joi.object({
            userId: joi.number().required(),
        });
        let validateResult = paramsSchema.validate(req.params);
        if (validateResult.error) {
            return res.status(422).send({
                message: validateResult.error.message
            });
        }

        const pagination = await PaginationUtil.getPaginatedModels(req, {
            where: {
                "dev_user_id": userId,
            }
        }, db.Comment);
        
        return res.status(200).send({
            maxPage: pagination.maxPage,
            comments: pagination.models
        });
    },

    /**
     * Get all the comments and replies that was liked by a certain user.
     * 
     * The list of the replies are paginated and if `page` and `limit` query params is not set, it
     * will default to the first page and limit it at max 30 rows.
     * 
     * The list of comments and replies is blended together in a single list and sorted based on the **timeframe** it was created.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing a max page for the pagination, as well as the list of comments and replies.
     */
    getUserLikes: async (req, res) => {
        const { userId } = req.params;

        const paramsSchema = joi.object({
            userId: joi.number().required(),
        });
        let validateResult = paramsSchema.validate(req.params);
        if (validateResult.error) {
            return res.status(422).send({
                message: validateResult.error.message
            });
        }

        const pagination = await PaginationUtil.getPaginatedModels(req, {
            where: {
                "dev_user_id": userId,
            }
        }, db.Like);

        return res.status(200).send({
            maxPage: pagination.maxPage,
            likes: pagination.models
        });
    },

    /**
     * Get the details of a specific user by their id.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing the user model.
     */
    getUser: async (req, res) => {
        const { userId } = req.params;

        const paramsSchema = joi.object({
            userId: joi.number().required(),
        });
        let validateResult = paramsSchema.validate(req.params);
        if (validateResult.error) {
            return res.status(422).send({
                message: validateResult.error.message
            });
        }

        const user = await db.DevUser.findByPk(userId);
        if (user === null) return res.status(404).send({
            statusCode: 404,
            message: "Dev user is not found!"
        });

        return res.status(200).send(user);
    },

    /**
     * Create a dev user.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing the newly created dev user model.
     */
    createUser: async (req, res) => {
        const { username } = req.body;

        const validateSchema = joi.object({
            username: joi.string().required()
        });
        const secondValidateResult = validateSchema.validate(req.body);
        if (secondValidateResult.error) return res.status(422).send({
            statusCode: 422,
            message: secondValidateResult.error.message
        });
        if(!req.header('x-auth-token')){
            return res.status(400).send('Authentication required')
        }
        else {
            let userExist = null;
            try {
                const userData = jwt.verify(req.header('x-auth-token'),JWT_KEY);
                userExist = await mod_users.findOne({
                    where: {
                        username: userData.username
                    }
                });
            }
            catch (err) {
                return res.status(403).send({ message: "Jwt expired!" });
            }
            
            const user = db.DevUser.build({
                username: username,
                user_id: userExist.id
            });
            await user.save();

            return res.status(200).send(user);
        }
    },

    /**
     * Update the details of a specific user.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing the dev user model.
     */
    updateUser: async (req, res) => {
        const { userId } = req.params;

        const paramsSchema = joi.object({
            userId: joi.number().required(),
        });
        let validateResult = paramsSchema.validate(req.params);
        if (validateResult.error) {
            return res.status(422).send({
                message: validateResult.error.message
            });
        }

        const { username } = req.body;

        const validateSchema = joi.object({
            username: joi.string().required()
        });
        const secondValidateResult = validateSchema.validate(req.body);
        if (secondValidateResult.error) return res.status(422).send({
            statusCode: 422,
            message: secondValidateResult.error.message
        });

        const user = await db.DevUser.findByPk(userId);
        if (user === null) return res.status(404).send({
            statusCode: 404,
            message: "Dev user is not found!"
        });

        user.username = username;
        await user.save();

        return res.status(200).send(user);
    },

    /**
     * Soft delete a specific user.
     * 
     * @param {Express.Request} req The request object containing the user request.
     * @param {Express.Response} res The response object that will be returned to the user.
     * @returns A response object with a json body containing the dev user model.
     */
    deleteUser: async (req, res) => {
        const { userId } = req.params;

        const paramsSchema = joi.object({
            userId: joi.number().required(),
        });
        let validateResult = paramsSchema.validate(req.params);
        if (validateResult.error) {
            return res.status(422).send({
                message: validateResult.error.message
            });
        }

        // Get the user with the provided user id
        const user = await db.DevUser.findByPk(userId);
        if (user === null) return res.status(404).send({
            statusCode: 404,
            message: "Dev user is not found!"
        });

        await user.destroy();

        return res.status(200).send(user);
    }
}

module.exports = devUserController;