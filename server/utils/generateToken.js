require("dotenv").config("../config/.env");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({_id:id}, process.env.TOKEN_KEY, {expiresIn: "2m"})
};

module.exports = generateToken;