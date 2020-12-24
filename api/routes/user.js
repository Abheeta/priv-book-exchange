// const express = require("express");
// const router = express.Router();
const userController = require("../controllers/userController.js");

// router.use(express.json());
// router.use(express.urlencoded());

module.exports = (router) => {
    router.post("/users/", (req, res) => userController.createUser(req, res, "Users"));

    router.get("/users/:username&:password", (req, res) => userController.validateLogin(req, res, "Users"));

    router.get("/users/:username", (req, res) => userController.checkUsername(req, res, "Users"));

};