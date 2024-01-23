const router = require("express").Router();
const { createNewUser, getAllUsers, getUserById, deleteUserByID } = require("../../controllers/users-controllers");

router.route('/')
.get(getAllUsers)
.post(createNewUser);

router.route('/:id')
.get(getUserById)
.delete(deleteUserByID);

module.exports = router;