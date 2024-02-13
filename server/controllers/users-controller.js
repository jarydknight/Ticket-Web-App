const User = require("../models/user");
const { readToken } = require("../utils/manageUserPermission")

// User controller object
const userController = {
    // Get all users
    getAllUsers(req, res) {
        User.find({})
        .then(dbData => {
            res.json(dbData)
        })
        .catch(err => {
            res.sendStatus(400);
        })
    },

    // Get user by ID
    getUserById(req, res) {
        const id = readToken(req.cookies.token)
        User.findById(id)
        .then(dbData => {
            res.json(dbData)
        })
        .catch(err => {
            res.sendStatus(400)
        });
    },

    // Delete user by ID
    deleteUserByID(req, res) {
        const id = readToken(req.cookies.token)
        User.findOneAndDelete(id)
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({message: 'User not fonud'})
                return;
            }
            res.json(dbData)
        })
        .catch(err => {
            res.json(err)
        })
    }
}

module.exports = userController;