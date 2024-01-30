const User = require("../models/user");
const generateToken = require("../utils/generateToken");

const signupController = {
    // Create new User
    async createNewUser({ body }, res, next) {
         // Check for existing user
        const existingUser = await User.findOne({email: body.email});
        if(existingUser) {
            return res.json({"Message": "User already exists"})
        };

        const user = await User.create(body)
        const token = generateToken(user._id)
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false
        });

        res
        .status(201)
        .json({"message": "User created successfully"})
    }
};

module.exports = signupController;