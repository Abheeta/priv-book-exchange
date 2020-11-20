const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

router.use(express.json());

router.post("/users", (req, res) => userController.createUser(req, res));

module.exports = router;