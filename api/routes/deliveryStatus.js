// const express = require("express");
// const router = express.Router();
const deliveryStatusController = require("../controllers/deliveryStatusController.js");

// router.use(express.json());
// router.use(express.urlencoded());

module.exports = (router) => {
    router.post("/delivery-status", (req, res) => deliveryStatusController.createDeliveryStatus(req, res));

    // router.get("/delivery-status/:deliveryStatusname&:password", (req, res) => deliveryStatusController.validateLogin(req, res));

    router.get("/delivery-status/:username", (req, res) => deliveryStatusController.queryByUsername(req, res));

    // router.get("/delivery-status", (req, res) => deliveryStatusController.getdeliveryStatus(req, res));

    router.put("/delivery-status/:id&:status&:br_id", (req, res) => deliveryStatusController.updateDelivery(req, res));

};