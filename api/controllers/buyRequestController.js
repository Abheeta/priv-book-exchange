const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db_connection = require("../../schema/schema.js");

app.use(bodyParser.urlencoded({extended: true}));

exports.insertBuyRequests = (req, res) => {
    db_connection.query("SELECT max(id) FROM BuyRequests", async (err, result) => {
        var id = parseInt(Math.max(result[0]["max(id)"])) + 1;
        db_connection.query(`INSERT INTO BuyRequests VALUES (
            ${id},
            "${req.body.username}",
            "${req.body.sell_id}",
            "Requested"
        )`, (err, result) => {
            if (err) throw err;
            res.status(200).send({
                ...result,
                err: false,
                message: "Successfully Created BuyRequest"
            });
        });
    }
)}

exports.queryBuyRequests = (req, res) => {
    db_connection.query(`SELECT * FROM BuyRequests WHERE sell_id="${req.params.sell_id}"`, (err, result) => {
        if(result[0]) res.send({
            buyRequests: result
        });
        else res.send({buyRequests: null})
    });
}

exports.acceptBuyRequest = (req, res) => {
    db_connection.query(`UPDATE BuyRequests SET status = "${req.params.status}" WHERE id = "${req.params.id}"`, (err, result) => {
        res.status(200).send(result)

    })
}

