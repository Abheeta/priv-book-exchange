const userController = require("../controllers/userController.js");

module.exports = (router) => {
    router.post("/users/", (req, res) => userController.createUser(req, res, "Users"));

    router.get("/users/:username&:password", (req, res) => userController.validateLogin(req, res, "Users"));

    router.get("/users/:username", (req, res) => userController.checkUsername(req, res, "Users"));

    router.get("/users", (req, res) => userController.getUser(req, res, "Users"));

    router.put("/users/:username", (req, res) => userController.updateUser(req, res, "Users"));

};