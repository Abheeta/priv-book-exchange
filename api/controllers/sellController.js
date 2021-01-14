const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db_connection = require("../../schema/schema.js");

app.use(bodyParser.urlencoded({extended: true}));

exports.insertSells = (req, res) => {
    var id;
    db_connection.query("SELECT max(id) FROM Sells", async (err, result) => {
        id = parseInt(Math.max(result[0]["max(id)"])) + 1;
        db_connection.query(
            `INSERT INTO Sells VALUES (
                ${id | 0},
                "${req.body.username}",
                "${req.body.book_id}",
                ${req.body.price},
                "${req.body.description}",
                ${req.body.status}
            )`, (err, result) => {
                if (err) throw err;
                res.status(200).send({
                    ...result,
                    err: false,
                    message: "Successfully Created Sells"
                });
            }
        )
    });
}

exports.getSells = (req, res) => {
    db_connection.query(`SELECT * FROM Sells WHERE book_id="${req.params.book_id}"`, (err, result) => {
        console.log(result);
        res.status(200).send({
            sells: result
        });
    });
}

exports.querySells = (req, res) => {
    if(req.query.username) {
        db_connection.query(`SELECT * FROM Sells WHERE username="${req.query.username}"`, (err, result) => {
            res.status(200).send({
                sells: result
            });
        });
    }
    else {
        db_connection.query(`SELECT * FROM Sells WHERE id="${req.query.sell_id}"`, (err, result) => {
            res.status(200).send({
                sells: result
            });
        });
    }
}