const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const userRouter = require("./api/routes/user.js")
const app = express();

app.use("/api", userRouter);

app.use(express.json());
app.use(express.urlencoded());
// app.use(bodyParser.json({ type: 'application/*+json' }));
// app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/book-exchange", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(8000, () => {
    console.log("Listening on port 8000");
});