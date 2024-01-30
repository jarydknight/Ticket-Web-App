const express = require("express");
require("dotenv").config({path: "./config/.env"});
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect mongoose to database
mongoose.connect(
    process.env.MONGODB_URL
)
.then(() => {
    console.log("MongoDB is connected successfully");
})
.catch((err) => {
    console.error(err);
})

app.use(require("./routes"));

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
});