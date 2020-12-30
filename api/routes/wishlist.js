// const express = require("express");
// const router = express.Router();
const wishlistController = require("../controllers/wishlistController.js");

// router.use(express.json());
// router.use(express.urlencoded());

module.exports = (router) => {
    router.post("/wishlists", (req, res) => wishlistController.insertWishlist(req, res));

    router.get("/wishlists/:username&:book_id", (req, res) => wishlistController.checkInWishlist(req, res));
    
    router.get("/wishlists/:username", (req, res) => wishlistController.queryWishlist(req, res));

    router.delete("/wishlists/:username&:book_id", (req, res) => wishlistController.removeFromWishlist(req, res));

};