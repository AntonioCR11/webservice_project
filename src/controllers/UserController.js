const path = require("path");
const Sequelize = require('sequelize');
const db = require(path.join(__dirname, "..", "models"));
var Joi = require('joi').extend(require('@joi/date'));
const conn = require("../databases/connection");
const sequelize = conn;

mod_users = require('../models/user')(sequelize, Sequelize.DataTypes);

sequelize.sync();

const jwt = require("jsonwebtoken");
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
            apikey : randomString
        });
        return res.status(201).send({
            message: "User added successfuly",
            body: {
                username: req.body.username,
                email: req.body.email,
            }
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

}

module.exports = UserController;