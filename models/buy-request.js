const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BuyRequestSchema = new Schema({
    userID: {
        type: ObjectId
    },
    sellID: {
        type: ObjectId
    },
    status: {
        type: String
    }
});

const BuyRequest = mongoose.model("BuyRequest", BuyRequestSchema);

module.exports = BuyRequest;