const userController = require("../controllers/userController.js");

module.exports = (router) => {
    router.post("/delivery-users/", (req, res) => userController.createUser(req, res, "DeliveryUsers"));

    router.get("/delivery-users/:username&:password", (req, res) => userController.validateLogin(req, res, "DeliveryUsers"));

    router.get("/delivery-users/:username", (req, res) => userController.checkUsername(req, res, "DeliveryUsers"));

    router.get("/delivery-users", (req, res) => userController.getUser(req, res, "DeliveryUsers"));

    router.put("/delivery-users/:username", (req, res) => userController.updateUser(req, res, "DeliveryUsers"));
};