const bookController = require("../controllers/bookController.js");

module.exports = (router) => {
    router.post("/books", (req, res) => bookController.insertBook(req, res));

    router.get("/books/:id", (req, res) => bookController.checkAvailability(req, res));

};