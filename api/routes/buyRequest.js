// const express = require("express");
// const router = express.Router();
const buyRequestController = require("../controllers/buyRequestController.js");

// router.use(express.json());
// router.use(express.urlencoded());

module.exports = (router) => {
    router.post("/buyrequests", (req, res) => buyRequestController.insertBuyRequests(req, res));

    router.get("/buyrequests/:sell_id", (req, res) => buyRequestController.getBuyRequests(req, res));

    router.get("/buyrequests", (req, res) => buyRequestController.queryBuyRequests(req, res));

    router.put("/buyrequests/:id&:status", (req, res) => buyRequestController.acceptBuyRequest(req,res));

};

