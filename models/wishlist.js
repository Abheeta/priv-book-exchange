const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    userID: {
        type: ObjectId
    },
    bookID: {
        type: ObjectId
    },
    available: {
        type: Boolean
    }
});

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = Wishlist;