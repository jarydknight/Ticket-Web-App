const { createNewTicket, getAllTickets, getTicketById, deleteTicketById, modifyTicket } = require("../../controllers/ticket-controller");
const { checkOwnership } = require("../../utils/manageUserPermission")

const router = require("express").Router();

router.route('/')
.get(getAllTickets)
.post(createNewTicket)

router.route('/:id')
.get(checkOwnership, getTicketById)
.put(checkOwnership, modifyTicket)
.delete(checkOwnership, deleteTicketById);

module.exports = router;