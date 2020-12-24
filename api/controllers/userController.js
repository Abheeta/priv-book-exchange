const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db_connection = require("../../schema/schema.js");
const bcryptjs = require("bcryptjs");

app.use(bodyParser.urlencoded({extended: true}));

exports.createUser = (req, res, type) => {
    console.log(req.body);
    bcryptjs.genSalt(10, (err, salt) => {
        if(err) throw err;
        bcryptjs.hash(req.body.password, salt, (err, hash) => {
            if(err) throw err;
            db_connection.query(
                `INSERT INTO ${type} VALUES(
                    "${req.body.name}",
                    "${req.body.username}",
                    "${req.body.email}",
                    "${hash}",
                    "${req.body.city}",
                    "${ type == "Users" ? req.body.address : parseInt(req.body.status) }"
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

exports.validateLogin = (req, res, type) => {
    var user;
    db_connection.query(
        `SELECT username, password FROM ${type} WHERE username = "${req.params.username}";`,
        (err, result) => {
            if (err) throw err;
            user = result[0];

            if (! user) {
                res.send({
                    err: true,
                    message: "Username does not exist"
                });
            }
            else {
                bcryptjs.compare(req.params.password, user.password).then((correct) => {
                    if(! correct) {
                        res.send({
                            err: true,
                            message: "Incorrect Password"
                        });
                    }

                    else {
                        res.status(200).send({
                            err: false,
                            message: "Validated for Login"
                        });
                    }
                });
            }
    });
};

exports.checkUsername = (req, res, type) => {
    var user;
    db_connection.query(
        `SELECT username FROM ${type} WHERE username = "${req.params.username}";`,
        (err, result) => {
            // if (err) throw err;
            user = result[0];

            if(user) {
                res.send({
                    err: true,
                    message: "Username already exists"
                });
            }
            else {
                res.status(200).send({
                    err: false,
                    message: "Username does not exist"
                })
            }
        });
};