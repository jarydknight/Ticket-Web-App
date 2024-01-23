const Ticket = require("../models/ticket")

// Ticket controller object
const ticketController = {
    //Create new ticket
    createNewTicket({body}, res) {
        Ticket.create(body)
        .then(dbData => {
            res.json(dbData)
        })
        .catch(err => {
            res.json(err)
        })
    },
    getAllTickets(req, res) {
        Ticket.find({})
        .populate(
            {
                path: 'user',
                select: '-__v'
            }
        )
        .then(dbData => {
            res.json(dbData)
        })
        .catch(err => {
            res.json(err)
        })
    }
}

module.exports = ticketController;