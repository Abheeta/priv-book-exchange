const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const userRouter = require("./api/routes/user.js");
const deliveryUserRouter = require("./api/routes/deliveryUser.js");
const app = express();
const cors = require("cors");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

userRouter(router);
deliveryUserRouter(router);
app.use("/api", router);

const db_connection = require("./schema/schema.js");

app.listen(8000, () => {
    console.log("Listening on port 8000");
});