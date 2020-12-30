// const express = require("express");
// const router = express.Router();
const sellController = require("../controllers/sellController.js");

// router.use(express.json());
// router.use(express.urlencoded());

module.exports = (router) => {
    router.post("/sells", (req, res) => sellController.insertSells(req, res));

    router.get("/sells/:book_id", (req, res) => sellController.getSells(req, res));

    router.get("/sells", (req, res) => sellController.querySells(req, res));

};