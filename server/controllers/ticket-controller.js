const { response } = require("express")
const Ticket = require("../models/ticket")
const { readToken } = require("../utils/manageUserPermission")
const { Types } = require("mongoose")

// Ticket controller object
const ticketController = {
    //Create new ticket
    createNewTicket(req, res) {
        const id = readToken(req.cookies.token)
        Ticket.create({
            "ticketNumber": req.body.ticketNumber,
            "user": id,
            "ticketDetails": req.body.ticketDetails,
            "ticketComments": req.body.ticketComments,
            "bucket": req.body.ticketBucket
        })
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

    getTicketById(req, res) {
        const id = readToken(req.cookies.token)
        Ticket.findById(req.params.id)
        .populate("user")
        .then(dbData => {
            console.log(dbData)
            if (dbData.user._id.toString() !== id) {
                res.status(401).json({message: "User not authorized to access this resource"})
                return;
            } else if (!dbData) {
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