const path = require("path");
const joi = require("joi");
const { Op } = require("sequelize");

const db = require(path.join(__dirname, "..", "models"));
const replyController = {
    getCommentReplies: async (req, res) => {
        const { onlyDate, startDate, endDate } = req.query;
        if (onlyDate != null) {
            try {
                const startDate = new Date(onlyDate);
                startDate.setHours(7, 0, 0, 0);
                const endDate = new Date(onlyDate);
                endDate.setHours(30, 59, 59, 999);
                const allComment = await db.Comment.findAll({
                    where: {
                        parent_id: req.params.commentId,
                        created_at: {
                            [Op.between]: [startDate, endDate]
                        },
                        deleted_at: null
                    }
                })
                if (allComment.length > 0) {
                    return res.status(200).send({
                        'message': "success",
                        'data': allComment
                    })
                }
                else {
                    return res.status(403).send({
                        'message': "Error",
                        'data': "No data found"
                    })
                }
            } catch (error) {
                return res.status(403).send({
                    'message': "Error",
                    'data': error.toString()
                })
            }
        }
        else if (startDate != null && endDate != null) {
            const startDateConv = new Date(startDate);
            startDateConv.setHours(7, 0, 0, 0);
            const endDateConv = new Date(endDate);
            endDateConv.setHours(30, 59, 59, 999);
            try {
                const allComment = await db.Comment.findAll({
                    where: {
                        parent_id: req.params.commentId,
                        created_at: {
                            [Op.between]: [startDateConv, endDateConv]
                        },
                        deleted_at: null
                    }
                })

                if (allComment.length > 0) {
                    return res.status(200).send({
                        'message': "success",
                        'data': allComment
                    })
                }
                else {
                    return res.status(403).send({
                        'message': "Error",
                        'data': "No data found"
                    })
                }
            } catch (error) {
                return res.status(403).send({
                    'message': "Error",
                    'data': error.toString()
                })
            }
        }
        else {
            return res.status(403).send({
                'message': "missing date"
            })
        }
    },
    updateCommentReplies: async (req, res) => {
        const { commentId, replyId } = req.params;
        const schema = joi.object({
            "content_id": joi.string().required(),
            "content_url": joi.string().required(),
            "dev_user_id": joi.number().required(),
            "body": joi.string().required(),
        });
        try {
            await schema.validateAsync(req.body);
        } catch (error) {
            return res.status(403).send({
                'message': error.toString()
            })
        }
        const { content_id, content_url, dev_user_id, body} = req.body;
        if (commentId == ":commentId" || commentId == "" || commentId == null) {
            return res.status(403).send({
                'message': "missing comment id"
            })
        }
        else if (replyId == ":replyId" || replyId == "" || replyId == null) {
            return res.status(403).send({
                'message': "missing reply id"
            })
        }
        else {
            const getReply = await db.Comment.findAll({
                where: {
                    parent_id: commentId,
                    id: replyId,
                    deleted_at: null
                }
            });
            if (getReply.length == 0) {
                return res.status(404).send({
                    'message': "Reply not found or already deleted"
                })
            }
            else {
                try {
                    const data = await db.Comment.update(
                        { content_id: content_id, content_url: content_url, dev_user_id: dev_user_id, body: body },
                        { where: { id: replyId, parent_id: commentId } }
                    );
                    return res.status(200).send({
                        'message': "success",
                        'data': await db.Comment.findAll({
                            where: {
                                parent_id: commentId,
                                id: replyId,
                                deleted_at: null
                            }
                        })
                    })
                }
                catch (error) {
                    return res.status(403).send({
                        'message': "Error",
                        'data': error.toString()
                    })
                }
            }
        }
    },
    deleteCommentReplies: async (req, res) => {
        const { commentId, replyId } = req.params;
        if (commentId == ":commentId" || commentId == "" || commentId == null) {
            return res.status(403).send({
                'message': "missing comment id"
            })
        }
        else if (replyId == ":replyId" || replyId == "" || replyId == null) {
            return res.status(403).send({
                'message': "missing reply id"
            })
        }
        else {
            const getReply = await db.Comment.findAll({
                where: {
                    parent_id: replyId,
                    id: commentId,
                    deleted_at: null
                }
            });
            if (getReply.length == 0) {
                return res.status(404).send({
                    'message': "Reply not found or already deleted"
                })
            }
            else {
                try {
                    await db.Comment.update(
                        { deleted_at: new Date() },
                        { where: { id: commentId, parent_id: replyId } }
                    ).then(() => {
                        return res.status(200).send({
                            'message': "Soft delete performed successfully.",
                        })
                    });
                } catch (error) {
                    return res.status(403).send({
                        'message': "Error",
                        'data': error.toString()
                    })
                }
            }
        }
    },
    createCommentReply: async (req, res) => {
        const schema = joi.object({
            "content_id": joi.string().required(),
            "content_url": joi.string().required(),
            "dev_user_id": joi.number().required(),
            "body": joi.string().required(),
            "is_reaction": joi.number().required(),
        });
        try {
            await schema.validateAsync(req.body);
        } catch (error) {
            return res.status(403).send({
                'message': error.toString()
            })
        }
        let { content_id, content_url, dev_user_id, body, is_reaction } = req.body;
        let { commentId } = req.params;
        if (commentId == ":commentId" || commentId == "" || commentId == null) {
            return res.status(403).send({
                'message': "missing comment id"
            })
        }
        try {
            await db.Comment.create({
                content_id: content_id,
                content_url: content_url,
                parent_id: commentId,
                dev_user_id: dev_user_id,
                body: body,
                is_reaction: is_reaction,
            }).then((result) => {
                return res.status(200).send({
                    'message': "success",
                    'data': result
                })
            })
        } catch (error) {
            return res.status(403).send({
                'message': "Error",
                'data': error.toString()
            })
        }
    }
}
module.exports = replyController;
