const { createNewTicket, getAllTickets, getTicketById, deleteTicketById } = require("../../controllers/ticket-controller");

const router = require("express").Router();

router.route('/')
.get(getAllTickets)
.post(createNewTicket)

router.route('/:id')
.get(getTicketById)
.delete(deleteTicketById);

module.exports = router;