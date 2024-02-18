const Ticket = require("../models/ticket")

// Ticket controller object
const ticketController = {
    //Create new ticket
    createNewTicket(req, res) {
        const id = res.locals.userId;
        const privilege = res.locals.privilege;

        if (privilege) {
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
        } else {
            res.json({message: "User not authorized to create new ticket"})
        }
        
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

    deleteTicketById(req, res) {
        const privilege = res.locals.privilege;
        const ownership = res.locals.ownership

        if (privilege === "l1Admin" || privilege === "l2Admin" || ownership) {
            Ticket.findOneAndDelete(req.params.id)
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
        } else {
            res.status(401).json({message: "User not aurthorized to delete this ticket"})
        }
        
    },

    getTicketById(req, res) {
        const privilege = res.locals.privilege;
        const ownership = res.locals.ownership;

        if (privilege === "l1Admin" || privilege === "l2Admin" || ownership ) {
           
            try {
                const ticket = res.locals.ticket;

                if (privilege === "l1Admin") {
                    console.log("User is an l1Admin")
                    res.json(ticket)
                } else if (privilege === "l2Admin") {
                    console.log("user is an l2Admin")
                    res.json(ticket)
                } else if (ownership) {
                    console.log("User is the owner of this ticket")
                    res.json(ticket)
                }
            } catch {
                console.error(err);
                res.status(404).json({message: "Ticket not found"})
            }
        } else {
            res.status(401).json({mesage: "User is not authorized to access this ticket"})
        }
        
    }
}

module.exports = ticketController;