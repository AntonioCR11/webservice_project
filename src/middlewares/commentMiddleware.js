// IMPORT
const { Op, QueryTypes, Sequelize, DataTypes } = require('sequelize');
const db = require('../databases/connection');
const axios = require('axios');
const fs = require("fs");
const FormData = require('form-data');

const data = new FormData();


// FUNCTIONS
const commentMiddleware = {
    checkExplicitImage: async (req, res, next) => {
        // If there is no image
        if (req.file == undefined) {
            // Create a text-based comment
            next();
        }

        let image = req.file;
        const data = new FormData();
        data.append('image', fs.createReadStream(image["path"]));
        
        const options = {
          method: 'POST',
          url: 'https://nsfw-images-detection-and-classification.p.rapidapi.com/adult-content-file',
          headers: {
            'X-RapidAPI-Key': '11f6d11ed2mshc77c7c102a1bbfdp19e9b4jsn70347b409b70',
            'X-RapidAPI-Host': 'nsfw-images-detection-and-classification.p.rapidapi.com',
            ...data.getHeaders(),
          },
          data: data
        };
        
        try {
            const response = await axios.request(options);
            if(response.data.unsafe){
                return res.status(400).send({
                    message : "Explicit image detected!"
                });
            }
        } catch (error) {
            console.error(error);
        }
        next();
    },
}
module.exports = commentMiddleware;
