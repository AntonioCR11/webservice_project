// IMPORT
const { Op, QueryTypes, Sequelize, DataTypes } = require('sequelize');
const db = require('../databases/connection');

// MODELS


// FUNCTIONS
const exampleFunction = async(req,res)=>{
    return res.status(200).send({message:"Hello world!"});
}

module.exports = {
    exampleFunction,
}
