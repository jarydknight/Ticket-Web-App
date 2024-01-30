const router = require("express").Router();
const { Login } = require("../../controllers/login-controller");

router.route("/")
.post(Login);

module.exports = router;