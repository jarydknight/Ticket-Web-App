const { createNewTicket, getAllTickets, getTicketById, deleteTicketById } = require("../../controllers/ticket-controller");
const { checkOwnership } = require("../../utils/manageUserPermission")

const router = require("express").Router();

router.route('/')
.get(getAllTickets)
.post(createNewTicket)

router.route('/:id')
.get(checkOwnership, getTicketById)
.delete(checkOwnership, deleteTicketById);

module.exports = router;