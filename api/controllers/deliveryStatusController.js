const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db_connection = require("../../schema/schema.js");
const bcryptjs = require("bcryptjs");

app.use(bodyParser.urlencoded({extended: true}));

exports.createDeliveryStatus = (req, res) => {
    db_connection.query("SELECT max(id) FROM DeliveryStatus", (err, result) => {
        var id = parseInt(Math.max(result[0]["max(id)"])) + 1;
        db_connection.query(`SELECT username FROM DeliveryUsers WHERE city="${req.body.city}"`, (err, result) => {
            if(result[0]) {
                result.forEach((value, index) => {
                    db_connection.query(`INSERT INTO DeliveryStatus VALUES(
                        ${id+index},
                        "${value.username}",
                        ${req.body.id},
                        "Requested"
                    )`, (error, inner_result) => {
                        if(error) throw error;
                        id = id + 1;
                    });
                });
                res.send({
                    err: false,
                    message: "Requested"
                })
            }
            else res.send({
                err: true,
                message: "No Delivery Users in this City"
            })
        });
        
    });
}

exports.queryByUsername = (req, res) => {
    db_connection.query(`SELECT ds.id, ds.buyrequest_id, ds.status, s.username as seller_username, br.username as buyer_username FROM users u, sells s, buyrequests br, deliverystatus ds
                        WHERE ds.buyrequest_id=br.id and br.sell_id=s.id and (s.username=u.username) and ds.username="${req.params.username}";`,
    (error, result) => {
        res.send(result);
    });
}

exports.updateDelivery = (req, res) => {
    db_connection.query(`UPDATE DeliveryStatus SET status="${req.params.status}" WHERE id=${req.params.id}`, (err, result) => {
        if(req.params.status === "Accepted") {
            db_connection.query(`UPDATE DeliveryStatus SET status="Taken" WHERE buyrequest_id=${req.params.br_id} and status="Requested"`, (err, response) => {
                result.inner_result = response;
                res.send(result);
            })
        }
        else {
            res.send(result);
        }
    });
}