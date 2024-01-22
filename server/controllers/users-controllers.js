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
    }
}

module.exports = userController;