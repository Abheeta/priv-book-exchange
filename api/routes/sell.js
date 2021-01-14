const sellController = require("../controllers/sellController.js");

module.exports = (router) => {
    router.post("/sells", (req, res) => sellController.insertSells(req, res));

    router.get("/sells/:book_id", (req, res) => sellController.getSells(req, res));

    router.get("/sells", (req, res) => sellController.querySells(req, res));

};