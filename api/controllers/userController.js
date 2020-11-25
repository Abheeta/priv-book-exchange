const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db_connection = require("../../schema/schema.js");
const bcryptjs = require("bcryptjs");

app.use(bodyParser.urlencoded({extended: true}));

exports.createUser = (req, res) => {
    bcryptjs.genSalt(10, (err, salt) => {
        if(err) throw err;
        bcryptjs.hash(req.body.password, salt, (err, hash) => {
            if(err) throw err;
            db_connection.query(
                `INSERT INTO Users VALUES(
                    "${req.body.name}",
                    "${req.body.username}",
                    "${req.body.email}",
                    "${hash}",
                    "${req.body.city}",
                    "${req.body.address}"
                )`,
                (err, result) => {
                    if (err) throw err;
                    res.status(200).send({
                        ...result,
                        err: false,
                        message: "Successfully created User"        
                });
            });                        
        });
    });
};

exports.validateLogin = (req, res) => {
    console.log("login");
    var user;
    db_connection.query(
        `SELECT username, password FROM Users WHERE username = "${req.params.username}";`,
        (err, result) => {
            if (err) throw err;
            user = result[0];
    })
};

exports.checkUsername = (req, res) => {
    console.log("username");
    res.send(req.params);
};