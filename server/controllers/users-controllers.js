const User = require("../models/user");

// User controller object
const userController = {
    createNewUser({ body }, res) {
        User.create(body)
        .then(dbData => {
            res.json(dbData)
        })
        .catch(err => {
            res.json(err)
        })
    },
    
    getAllUsers(req, res) {
        User.find({})
        .then(dbData => {
            res.json(dbData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    }
}

module.exports = userController;