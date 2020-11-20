const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SellsSchema = new Schema({
    userID: {
        type: ObjectId
    },
    bookID: {
        type: ObjectId
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    status: {
        type: Boolean
    }
});

const Sells = mongoose.model("Sells", SellsSchema);

module.exports = Sells;