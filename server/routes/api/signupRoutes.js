const router = require("express").Router();
const { createNewUser } = require("../../controllers/signup-controller");

router.route("/")
.post(createNewUser);

module.exports = router;