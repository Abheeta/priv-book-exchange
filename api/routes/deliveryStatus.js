const deliveryStatusController = require("../controllers/deliveryStatusController.js");

module.exports = (router) => {
    router.post("/delivery-status", (req, res) => deliveryStatusController.createDeliveryStatus(req, res));

    router.get("/delivery-status/:username", (req, res) => deliveryStatusController.queryByUsername(req, res));

    router.put("/delivery-status/:id&:status&:br_id", (req, res) => deliveryStatusController.updateDelivery(req, res));

};