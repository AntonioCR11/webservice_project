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
    
    let getdata = await axios.post(
        "https://openai80.p.rapidapi.com/chat/completions",
        {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'user',
                content: `generate 10 keyword in word form from this comment for popular search tag, just give the answer as one sentence separated by coma(,) : ${comment}`
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
    
    let dataResult = getdata.data.choices[0].message.content;
    let result = dataResult.split(", ");
    return res.status(200).send({
        "word-cloud" : result
    });
}
const translateLanguage = async(req,res)=>{
    // VALIDATION
    /*
        valid language
        {'uz', 'fy', 'oc', 'br', 'ka', 'lo', 'ms', 'sk', 'km', 'az', 'id', 'uk', 'lg', 'ss', 
        'fr', 'ps', 'yi', 'be', 'ln', 'sr', 'es', 'kn', 'so', 'hi', 'sq', 'gl', 'bg', 'fi', 
        'vi', 'bs', 'mn', 'en', 'gd', 'ne', 'tr', 'sl', 'nl', 'pa', 'zh', 'ur', 'mr', 'lv', 
        'ceb', 'it', 'ja', 'ru', 'is', 'ha', 'lb', 'su', 'yo', 'de', 'tl', 'gu', 'da', 'xh', 
        'hu', 'ff', 'cs', 'mk', 'sd', 'no', 'wo', 'ns', 'et', 'he', 'ta', 'am', 'pl', 'ba', 
        'th', 'ig', 'ro', 'si', 'jv', 'kk', 'hy', 'sw', 'ast', 'pt', 'mg', 'zu', 'bn', 'ga', 
        'ml', 'hr', 'tn', 'cy', 'af', 'ilo', 'el', 'sv', 'ko', 'lt', 'fa', 'or', 'my', 'ar', 'ca', 'ht'}.
    */
    const schema = Joi.object({
        comment: Joi.string().required().messages({
            "string.empty" : "Comment field is required!",
        }),
    });
    try { await schema.validateAsync(req.body) } 
    catch (error) { return res.status(400).send({message : error.toString()}) }

    // Open AI API Call
    let {comment} = req.body;
    let {lang} = req.query;
    if(!lang){
        lang = "en";
    }
    let rapidApiKey = req.get("X-RapidAPI-Key");
    let rapidApiHost =  req.get("X-RapidAPI-Host");

    let getdata = await axios.post(
        "https://translator82.p.rapidapi.com/api/translate",
        {
            language : lang,
            text : comment
        },
        {
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': rapidApiKey,
                'X-RapidAPI-Host': rapidApiHost,
            }
        }
    );
    let result = getdata.data.result;
    return res.status(200).send({
        "translated" : result
    });
}

module.exports = {
    generateWordCloud,
    translateLanguage
}

