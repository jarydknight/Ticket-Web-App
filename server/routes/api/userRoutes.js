const router = require("express").Router();
const { getAllUsers, getUserById, deleteUserByID } = require("../../controllers/users-controller");

router.route('/')
.get(getAllUsers)

router.route('/:id')
.get(getUserById)
.delete(deleteUserByID);

module.exports = router;