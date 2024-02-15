const { response } = require("express")
const Ticket = require("../models/ticket")
const { checkAdminPrivilege } = require("../utils/manageUserPermission")
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
    },

    getTicketById(req, res) {
    const userId = res.locals.userId;
    Ticket.findById(req.params.id)
    .populate("user")
    .then( async (dbData) => {
        const privilege = await checkAdminPrivilege(userId, dbData.bucket)
        console.log(privilege)
        if (!dbData) {
            res.status(404).json({message: "Ticket not found"})
        } else if (privilege === "l1Admin") {
            console.log("User is an l1Admin")
            res.json(dbData)
        } else if(privilege === "l2Admin") {
            console.log("user is an l2Admin")
            res.json(dbData)
        } else if (userId === dbData.user._id.toString()) {
            console.log("User is the owner of this ticket")
            res.json(dbData)
        } else {
            res.status(401).json({message: "User not authorized to access this resource"})
        }
    })
    .catch(err => {
        res.json({message: err})
    })
}
}

module.exports = ticketController;