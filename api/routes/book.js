// const express = require("express");
// const router = express.Router();
const bookController = require("../controllers/bookController.js");

// router.use(express.json());
// router.use(express.urlencoded());

module.exports = (router) => {
    router.post("/books", (req, res) => bookController.insertBook(req, res));

    router.get("/books/:id", (req, res) => bookController.checkAvailability(req, res));

};