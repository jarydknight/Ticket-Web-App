const User = require("../models/user");

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
        const id = res.locals.userId
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
        const id = res.locals.userId
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