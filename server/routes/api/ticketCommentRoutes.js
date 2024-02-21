const router = require("express").Router();
const { createNewTicketComment, deleteTicketCommentByID } = require("../../controllers/ticketComment-controller");
const { checkOwnership } = require("../../utils/manageUserPermission")

router.route("/")
.post(checkOwnership, createNewTicketComment)

router.route("/:id")
.delete(deleteTicketCommentByID)

module.exports = router;