const router = require("express").Router();
const { createNewUser, getAllUsers } = require("../../controllers/users-controllers");

router.route('/')
.get(getAllUsers)
.post(createNewUser);

module.exports = router;