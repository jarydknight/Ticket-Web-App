const User = require("../models/user");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

// Controller for users to log in
const loginController = {
    async Login({body}, res, next) {
        if (!body.email || !body.password) {
            return res.json({message: "Missing email or password"})
        }

        const user = await User.findOne({email: body.email})
        .select(["_id", "password", "email"]);

        if (!user) {
            return res.json({message: "Incorrect email or password"})
        }

        const auth = await bcrypt.compare(body.password, user.password);
        let token;

        if (!auth) {
            return res.json({message: "Incorrect email or password"})
        } else {
            token = generateToken(user._id)
        }

        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true
        })
        res.status(201)
        .json({message: "User logged in succesfully"})
    }
};

module.exports = loginController;