// const express = require("express");
// const router = express.Router();
const buyRequestController = require("../controllers/buyRequestController.js");

// router.use(express.json());
// router.use(express.urlencoded());

module.exports = (router) => {
    router.post("/buyrequests", (req, res) => buyRequestController.insertBuyRequests(req, res));

    router.get("/buyrequests/:sell_id", (req, res) => buyRequestController.queryBuyRequests(req, res));

};