const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    address: {
        type: String
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;