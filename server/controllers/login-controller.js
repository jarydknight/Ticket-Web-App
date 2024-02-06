const User = require("../models/user");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const loginController = {
    async Login({body}, res, next) {
        if (!body.email || !body.password) {
            return res.json({message: "Missing email or password"})
        }

        const user = await User.findOne({email: body.email});

        if (!user) {
            return res.json({message: "Incorrect email or password"})
        }

        const auth = await bcrypt.compare(body.password, user.password);

        if (!auth) {
            return res.json({message: "Incorrect email or password"})
        }

        const token = generateToken(user._id)

        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true
        })
        res.status(201)
        .json({message: "User logged in succesfully"})
    }
};

module.exports = loginController;