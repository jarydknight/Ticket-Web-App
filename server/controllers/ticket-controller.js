const { response } = require("express")
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
        .populate("user")
        .then(dbData => {
            res.json(dbData)
        })
        .catch(err => {
            res.json(err)
        })
    },

    getTicketById({params}, res) {
        Ticket.findById(params.id)
        .populate("user")
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({message: "Ticket not found"})
                return;
            }
            res.json(dbData)
        })
        .catch(err => {
            response.json(err)
        })
    },

    deleteTicketById(params, res) {
        Ticket.findOneAndDelete(params.id)
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({message: "Ticket not found"})
                return;
            }
            res.json(dbData)
        })
        .catch(err => {
            res.json(err)
        })
    }
}

module.exports = ticketController;