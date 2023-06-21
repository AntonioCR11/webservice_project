var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const Sequelize = require('sequelize');
var Joi = require('joi').extend(require('@joi/date'));
const jwt = require("jsonwebtoken");
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

const conn = require('../databases/connection');
const sequelize = conn;

mod_users = require("../models/user")(sequelize, Sequelize.DataTypes);

sequelize.sync();
async function addUser(req, res,next) {
    console.log("test");
}
// mod_Buku.hasOne(mod_KategoriBuku, {
//     foreignKey: "id_kategori",
//     sourceKey: "id"
// });
// mod_KategoriBuku.belongsTo(mod_Buku, {
//     foreignKey: "id_kategori",
//     targetKey: "id"
// });



// async function addBuku(req, res,next) {
//     const buku = await mod_Buku.create({
//         id: req.body.id,
//         nama: req.body.nama,
//         tahunTerbit: req.body.tahun_terbit,
//         id_kategori: req.body.id_kategori
//     });
//     return res.status(200).json({
//         message: "Success",
//         data: buku
//     });
// }

// async function updateBuku(req, res,next) {
//     const buku = await mod_Buku.update({
//         nama: req.body.nama,
//         tahunTerbit: req.body.tahun_terbit,
//         id_kategori: req.body.id_kategori
//     }, {
//         where: {
//             id: req.body.id
//         }
//     });
//     return res.status(200).json({
//         message: "Success",
//         body : {
//             id : req.body.id,
//             nama : req.body.nama,
//             tahun_terbit : req.body.tahun_terbit,
//             id_kategori : req.body.id_kategori
//         }
//     });
// }

// async function deleteBuku(req, res,next) {
//     const buku = await mod_Buku.destroy({
//         where: {
//             id: req.body.id
//         }
//     });
//     return res.status(200).json({
//         message: "Success",
//         data: buku
//     });
// }


module.exports = {
    addUser
}