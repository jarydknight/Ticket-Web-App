const { createNewTicket, getAllTickets } = require("../../controllers/ticket-controller");

const router = require("express").Router();

router.route('/')
.get(getAllTickets)
.post(createNewTicket)

module.exports = router;