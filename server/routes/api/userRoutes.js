const router = require("express").Router();
const { createNewUser, getAllUsers, getUserById } = require("../../controllers/users-controllers");

router.route('/')
.get(getAllUsers)
.post(createNewUser);

router.route('/:id')
.get(getUserById);

module.exports = router;