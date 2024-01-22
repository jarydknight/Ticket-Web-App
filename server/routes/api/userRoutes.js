const router = require("express").Router();
const { createNewUser } = require("../../controllers/users-controllers");

router.route('/')
.get((req, res) => {
    res.send({user: "Jaryd"})
})
.post(createNewUser);

module.exports = router;