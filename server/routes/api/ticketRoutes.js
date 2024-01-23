const { createNewTicket } = require("../../controllers/ticket-controller");

const router = require("express").Router();

router.route('/')
.get((req, res) => {
    res.send({ticket: "Ticket info"})
})
.post(createNewTicket)

module.exports = router;