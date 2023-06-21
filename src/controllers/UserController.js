const path = require("path");
const Sequelize = require('sequelize');
const db = require(path.join(__dirname, "..", "models"));
var Joi = require('joi').extend(require('@joi/date'));
const conn = require("../databases/connection");
const sequelize = conn;

mod_users = require('../models/user')(sequelize, Sequelize.DataTypes);
mod_dev_users = require('../models/dev_user')(sequelize, Sequelize.DataTypes);
mod_comments = require('../models/comment')(sequelize, Sequelize.DataTypes);
mod_likes = require('../models/like')(sequelize, Sequelize.DataTypes);

sequelize.sync();

const jwt = require("jsonwebtoken");
const user = require("../models/user");
const JWT_KEY = 'KELOMPOK_OP';

const UserController = {
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
    addUser: async (req, res) => {
        const schema = Joi.object({
            username: Joi.string().required().min(6).max(15),
            password: Joi.string().alphanum().required().min(6).max(15),
            email: Joi.string().required().email(),
            gender: Joi.any().required().valid('female', 'Female', 'Male', 'male'),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message,
            });
        }
        const userExist = await mod_users.findOne({
            where: {
                username: req.body.username
            }
        });
        if (userExist) {
            return res.status(400).send({
                message: "Username already exist",
            });
        }
        let randomString = Math.random().toString(36).slice(2, 7);
        await mod_users.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            gender: req.body.gender,
            apikey: randomString
        });
        var userSize = await mod_users.count();
        const newTrialSubs = db.Subscription.build({
            user_id: userSize,
            tier_id: 1,
            price: 0,
            duration: 7,
            start_date: new Date(Date.now()),
            end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            transaction_status: "completed"
        })
        await newTrialSubs.save();
        return res.status(201).send({
            message: "User added successfuly",
            body: {
                username: req.body.username,
                email: req.body.email,
            },
            Additional: "Your trial subscription will end in " + new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });
    },
    userLogin: async (req, res) => {
        const schema = Joi.object({
            username: Joi.string().required().min(6).max(15),
            password: Joi.string().alphanum().required().min(6).max(15),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message,
            });
        }
        const userExist = await mod_users.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!userExist) {
            return res.status(400).send({
                message: "Username not found",
            });
        }
        if (userExist.password !== req.body.password) {
            return res.status(400).send({
                message: "Password is wrong",
            });
        }
        const token = jwt.sign({
            username: userExist.username,
            email: userExist.email,
            apikey: userExist.apikey
        }, JWT_KEY, { expiresIn: "1h" });
        return res.status(200).send({
            message: "Login successful",
            token: token,
        });
    },
    updateUser: async (req, res) => {
        var userExist = await mod_users.findOne({
            where: {
                username: req.params.username,
                deleted_at: null
            }
        });
        if (!userExist) {
            return res.status(400).send({
                message: "User not found",
            });
        }
        else {
            if (req.body.password != userExist.password) {
                return res.status(400).send({
                    message: "Password is wrong",
                });
            }
        }
        const schema = Joi.object({
            password: Joi.string().alphanum().required().min(6).max(15),
            confirm_password: Joi.string().required().valid(Joi.ref('password')),
            email: Joi.string().required().email(),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message,
            });
        }
        await mod_users.update({
            password: req.body.password,
            email: req.body.email,
        }, {
            where: {
                username: req.params.username
            }
        });
        return res.status(200).send({
            message: "User updated successfuly",
            body: {
                username: req.params.username,
                email: req.body.email,
            }
        });
    },
    deleteUser: async (req, res) => {
        var userExist = await mod_users.findOne({
            where: {
                username: req.params.username,
                deleted_at: null
            }
        });

        // var date = new Date();
        // var timestamps = date.getFullYear() + "-0" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":0" + date.getSeconds();
        if (!userExist) {
            return res.status(400).send({
                message: "User not found",
            });
        }
        const timestamp = new Date(Date.now());
        console.log(timestamp);

        await mod_users.update(
            {
                deleted_at: timestamp,
            },
            {
                where: {
                    username: req.params.username,
                },
            }
        );
        return res.status(200).send({
            message: "User deleted successfuly",
            body: {
                username: req.params.username,
            }
        });
    },
    subsTier: async (req, res) => {
        const { tier_id } = req.body
        if (tier_id == null) {
            return res.status(400).send({
                message: "Tier id is null",
            });
        }
        if (!req.header('x-auth-token')) {
            return res.status(400).send('Authentication required')
        }
        else {
            const userData = jwt.verify(req.header('x-auth-token'), JWT_KEY);
            const userExist = await mod_users.findOne({
                where: {
                    username: userData.username
                }
            });
            if (!userExist) {
                return res.status(400).send({
                    message: "Username not found",
                });
            }
            const tierExist = await db.SubTier.findOne({
                where: {
                    id: tier_id
                }
            });
            if (!tierExist) {
                return res.status(400).send({
                    message: "Tier not found",
                });
            }
            const balance = userExist.saldo - tierExist.price;
            if (balance < 0) {
                return res.status(400).send({
                    message: "Insufficient balance",
                });
            }
            else {
                await mod_users.update({
                    saldo: balance
                }, {
                    where: {
                        username: userData.username
                    }
                });
                const subsExist = await db.Subscription.findOne({
                    where: {
                        user_id: userExist.id,
                        transaction_status: "completed"
                    }
                });
                if (subsExist) {
                    subsExist.update({
                        start_date: new Date(Date.now()),
                        end_date: new Date(Date.now() + tierExist.duration * 24 * 60 * 60 * 1000),
                        tier_id: tier_id,
                        price: tierExist.price,
                        duration: tierExist.duration,
                    });
                }
                else {
                    const newSubs = db.Subscription.build({
                        user_id: userExist.id,
                        tier_id: tier_id,
                        price: tierExist.price,
                        duration: tierExist.duration,
                        start_date: new Date(Date.now()),
                        end_date: new Date(Date.now() + tierExist.duration * 24 * 60 * 60 * 1000),
                        transaction_status: "completed"
                    })
                    await newSubs.save();
                }
                return res.status(200).send({
                    message: "Subscription successful",
                    body: {
                        username: userData.username,
                        tier_id: tier_id,
                    }
                });
            }
        }
    },
    userTopup: async (req, res) => {
        if (!req.header('x-auth-token')) {
            return res.status(400).send('Unauthorized');
        }
        try {

            let userdata = jwt.verify(req.header('x-auth-token'), JWT_KEY);
        }
        catch (err) {
            return res.status(400).send('Invalid Token');
        }
        const schema = Joi.object({
            username: Joi.string().required().min(6).max(15),
            password: Joi.string().alphanum().required().min(6).max(15),
            amount: Joi.number().required().min(1),
        });
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message,
            });
        }
        const userExist = await mod_users.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!userExist) {
            return res.status(400).send({
                message: "Username not found",
            });
        }
        if (userExist.password !== req.body.password) {
            return res.status(400).send({
                message: "Password is wrong",
            });
        }
        var userBalance = userExist.saldo;
        var newBalance = parseInt(userBalance) + parseInt(req.body.amount);
        await mod_users.update({
            saldo: newBalance,
        }, {
            where: {
                username: req.body.username
            }
        });
        return res.status(200).send({
            message: "Topup successful",
            body: {
                username: req.body.username,
                saldo: newBalance,
            }
        });
    },
    toggleLike : async (req, res) => {
        var userExist = await mod_dev_users.findOne({
            where: {
                user_id: req.params.userId,
                deleted_at: null
            }
        });
        if (!userExist) {
            return res.status(404).send({
                message: "User not found",
            });
        }
        var commentExist = await mod_comments.findOne({
            where: {
                id: req.body.comment_id,
                deleted_at: null
            }
        });
        if (!commentExist) {
            return res.status(404).send({
                message: "Comment not found",
            });
        }
        var likeExist = await mod_likes.findOne({
            where: {
                dev_user_id: req.params.userId,
                comment_id: req.body.comment_id,
            }
        });
        if (likeExist) {
            await mod_likes.destroy({
                where: {
                    dev_user_id: req.params.userId,
                    comment_id: req.body.comment_id,
                }
            });
            await mod_comments.update({
                total_likes: commentExist.total_likes - 1,
            }, {
                where: {
                    id: req.body.comment_id,
                }
            });
            return res.status(200).send({
                message: "Dislike successful",
                body: {
                    user_id: req.params.userId,
                    comment_id: req.body.comment_id,
                }
            });
        }
        const newLike = mod_likes.build({
            dev_user_id: req.params.userId,
            comment_id: req.body.comment_id,
        });
        await newLike.save();
        await mod_comments.update({
            total_likes: commentExist.total_likes + 1,
        }, {
            where: {
                id: req.body.comment_id,
            }
        });
        
        return res.status(200).send({
            message: "Like successful",
            body: {
                user_id: req.params.userId,
                comment_id: req.body.comment_id,
            }
        });
    },
}

module.exports = UserController;