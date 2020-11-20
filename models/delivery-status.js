const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeliveryStatusSchema = new Schema({
    deliveryUserID: {
        type: ObjectId
    },
    buyRequestID: {
        type: ObjectId
    },
    status: {
        type: String
    }
});

const DeliveryStatus = mongoose.model("DeliveryStatus", DeliveryStatusSchema);

module.exports = DeliveryStatus;