const express = require("express");
const userRouter = require("./api/routes/user.js")
const app = express();
const cors = require("cors");

app.use(cors());

app.use("/api", userRouter);

app.use(express.json());
app.use(express.urlencoded());

const db_connection = require("./schema/schema.js");

app.listen(8000, () => {
    console.log("Listening on port 8000");
});