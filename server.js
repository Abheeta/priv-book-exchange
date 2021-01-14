const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const userRouter = require("./api/routes/user.js");
const deliveryUserRouter = require("./api/routes/deliveryUser.js");
const bookRouter = require("./api/routes/book.js")
const sellRouter = require("./api/routes/sell.js")
const wishlistRouter = require("./api/routes/wishlist.js")
const buyRequestRouter = require("./api/routes/buyRequest.js")
const deliveryStatusRouter = require("./api/routes/deliveryStatus.js")
const app = express();
const cors = require("cors");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

userRouter(router);
deliveryUserRouter(router);
bookRouter(router);
sellRouter(router);
wishlistRouter(router);
buyRequestRouter(router);
deliveryStatusRouter(router);
app.use("/api", router);

const db_connection = require("./schema/schema.js");

app.listen(8000, () => {
    console.log("Listening on port 8000");
});