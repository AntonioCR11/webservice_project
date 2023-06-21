const { Op, QueryTypes, Sequelize } = require('sequelize');
const db = require('../databases/connection');
const Joi = require('joi').extend(require('@joi/date'));
const axios = require('axios');
const multer = require("multer");
const fs = require("fs");
  
const generateWordCloud = async(req,res)=>{
    // VALIDATION
    const schema = Joi.object({
        comment: Joi.string().required().messages({
            "string.empty" : "Comment field is required!",
        }),
    });
    try { await schema.validateAsync(req.body) } 
    catch (error) { return res.status(400).send({message : error.toString()}) }

    // Open AI API Call
    let {comment} = req.body;
    let rapidApiKey = req.get("X-RapidAPI-Key");
    let rapidApiHost =  req.get("X-RapidAPI-Host");
    console.log(rapidApiKey);
    let getdata = await axios.post(
        "https://openai80.p.rapidapi.com/chat/completions",
        {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'user',
                content: `generate keyword in word form from this comment for popular search tag : ${comment}`
              }
            ]
        },
        {
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': rapidApiKey,
                'X-RapidAPI-Host': rapidApiHost,
                'Accept-Encoding': 'identity',
            }
        }
    );
    
    let result = getdata.data.choices[0].message.content;
    return res.status(200).send(result);
}
module.exports = {
    generateWordCloud
}

