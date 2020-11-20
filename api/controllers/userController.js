const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const User = require("../../models/user.js");

app.use(bodyParser.urlencoded({extended: true}));

exports.createUser = (req, res) => {
    // res.send(req.body);
    User.create(req.body).then((user) => {
        res.send({
            ... user,
            error: false,
            message: "Successfully Created User"
        });
    }).catch((err) => {
        res.send({
            error: true,
            message: err
        });
    });
};