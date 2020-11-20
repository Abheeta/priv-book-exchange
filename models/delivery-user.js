const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeliveryUserSchema = new Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    city: {
        type: String
    },
    status: {
        type: Boolean
    }
});

const DeliveryUser = mongoose.model("DeliveryUser", DeliveryUserSchema);

module.exports = DeliveryUser;