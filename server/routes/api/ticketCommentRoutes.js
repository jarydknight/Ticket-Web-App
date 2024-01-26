const router = require("express").Router();
const { createNewTicketComment, deleteTicketCommentByID } = require("../../controllers/ticketComment-controller");

router.route("/")
.post(createNewTicketComment)

router.route("/:id")
.delete(deleteTicketCommentByID)

module.exports = router;