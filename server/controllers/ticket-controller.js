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

    // TODO: implement ownership middleware and cleanup code
    getTicketById(req, res) {
    const userId = res.locals.userId;
    const privilege = res.locals.privilege

    Ticket.findById(req.params.id)
    .populate("user")
    .then( async (dbData) => {
        // const privilege = (userId, dbData.bucket)
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