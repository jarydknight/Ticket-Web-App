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
        const id = req.params.id;

        if (id === res.locals.userId) {
            try {
                User.findById(id)
                .then(dbData => {
                    if (dbData) {
                        res.json(dbData)
                    } else {
                        res.status(401).json({message: "User not found"})
                    }
                })
            } catch {
                res.status(400).json({message: "Error finding user"})
            }
        } else {
            res.status(401).json({message:"User not authorized to access user"})
        }
    },

    // Delete user by ID
    deleteUserByID(req, res) {
        const id = req.params.id;

        if (id === res.locals.userId) {
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
        } else {
            res.status(401).json({message: "User not authorized to delete this user"})
        }
    }
}

module.exports = userController;