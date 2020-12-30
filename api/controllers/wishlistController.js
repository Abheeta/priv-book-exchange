const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db_connection = require("../../schema/schema.js");

app.use(bodyParser.urlencoded({extended: true}));

exports.insertWishlist = (req, res) => {
    var id;
    db_connection.query("SELECT max(id) FROM Wishlists", async (err, result) => {
        id = parseInt(result[0]['max(id)']) + 1 | 0;
        db_connection.query(
            `INSERT INTO Wishlists VALUES (
                ${id},
                "${req.body.username}",
                "${req.body.book_id}",
                ${req.body.available}
            )`, (err, result) => {
                if (err) throw err;
                res.status(200).send({
                    ...result,
                    err: false,
                    message: "Successfully Created Wishlist"
                });
            }
        )
    });
}

exports.checkInWishlist = (req, res) => {
    db_connection.query(`SELECT * FROM Wishlists WHERE username="${req.params.username}" AND book_id="${req.params.book_id}";`, (err, result) => {
        var wishlist = result[0];
        if(wishlist) {
            res.status(200).send({
                exists: true
            });
        }
        else {
            res.status(200).send({
                exists: false
            });
        }
    })
}

exports.removeFromWishlist = (req, res) => {
    db_connection.query(`DELETE FROM Wishlists WHERE username="${req.params.username}" AND book_id="${req.params.book_id}";`, (err, result) => {
        if (err) throw err;
        res.send({
            err: false,
            message: "Wishlist deleted"
        });
    });
}

exports.queryWishlist = (req, res) => {
    db_connection.query(`SELECT * FROM Wishlists WHERE username="${req.params.username}"`, (err, result) => {
        res.send({
            wishlist: result
        });
    });
}