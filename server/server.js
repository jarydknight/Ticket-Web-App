const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect mongoose to database
mongoose.connect(
    process.env.MONGODB_URL
);

app.use(require("./routes"));

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
});