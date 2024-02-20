const Ticket = require("../models/ticket");
const Bucket = require("../models/ticketBucket");
const User = require("../models/user");

const openTicket = (ticketId) => {
    Ticket.findById(ticketId)
    .then( dbData => {
        if (!dbData) {
            res.status(401).json({message: "Ticket not found"})
        } else {
            dbData.status = "open";
            dbData.save();
        }
    })
    .catch(err => {
        console.error(err);
        res.status(400).json({message: "Error updating ticket status"})
    })
}

const closeTicket = (ticketId) => {
    Ticket.findById(ticketId)
    .then( dbData => {
        if (!dbData) {
            res.status(401).json({message: "Ticket not found"})
        } else {
            dbData.status = "closed";
            dbData.save();
        }
    })
    .catch( err => {
        console.error(err);
        res.status(400).json({message: "Error updting ticket status"})
    })
}

module.exports = { openTicket, closeTicket };