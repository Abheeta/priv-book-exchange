const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db_connection = require("../../schema/schema.js");

app.use(bodyParser.urlencoded({extended: true}));

exports.insertBook = (req, res) => {
    db_connection.query(
        `INSERT INTO Books VALUES (
            "${req.body.id}",
            "${req.body.title}",
            "${req.body.subtitle}",
            "${req.body.publisher}",
            "${req.body.published_date}",
            "${req.body.language}",
            "${req.body.price}",
            "${req.body.authors}",
            "${req.body.description}",
            "${req.body.categories}",
            ${req.body.availability}
        )`, (err, result) => {
            if (err) throw err;
            res.status(200).send({
                ...result,
                err: false,
                message: "Succesfully inserted Book"
            });
        }
    );
}

exports.checkAvailability = (req, res) => {
    db_connection.query(
        `Select availability from Books WHERE id="${req.params.id}";`,
        (err, result) => {
            var book = result[0];

            if(book) {
                res.status(200).send({
                    exists: true,
                    availability: book.availability
                })
            }

            else {
                res.status(200).send({
                    exists: false,
                    availability: 0
                })
            }
        }
    )
}