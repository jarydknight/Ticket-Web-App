const Ticket = require("../models/ticket");
const User = require("../models/user");
const Bucket = require("../models/ticketBucket");

// Ticket controller object
// TODO: ADD TICKET OBJECT ID TO USER OBJECT AND BUCKET OBJECT WHEN TICKET CREATED
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
                "bucket": req.body.ticketBucket,
                "status": "open"
            })
            .then(dbData => {
                res.locals.ticket = dbData;
            })
            .catch(err => {
                res.json(err)
            })

            // Add ticket ObjectId to User object
            User.findById(id)
            .then(dbData => {
                dbData.userTickets.push(res.locals.ticket._id);
                dbData.save();
            })
            .catch(err => {
                console.error(err)
                res.json({message: "Error adding ticket to user object"})
            })
            

            // Add ticket ObjectId to Bucket object
            Bucket.findById(req.body.ticketBucket)
            .select("tickets")
            .then(dbData => {
                dbData.tickets.push(res.locals.ticket._id);
                dbData.save();
            })
            .catch(err => {
                console.error(err)
                res.json({message: "Error adding ticket to bucket object"})
            })

            res.json({message: "Ticket created successfully"})

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

                if (ownership || privilege === "l1Admin" || privilege === "l2Admin") {
                    res.json(ticket)
                } 
            } catch {
                console.error(err);
                res.status(404).json({message: "Ticket not found"})
            }
        } else {
            res.status(401).json({mesage: "User is not authorized to access this ticket"})
        }
        
    },

   modifyTicket(req, res) {
    const privilege = res.locals.privilege;

        if (privilege === "l1Admin" || privilege === "l2Admin") {
            try {
                const ticket = res.locals.ticket;
                Ticket.updateOne({_id: ticket._id}, req.body)
                .then( dbData => {
                    res.json({message: "Ticket updated Successfully"})
                })
                
            } catch {
                res.status(400).json({message: "Error updating ticket"})
            }
        } else {
            res.status(401).json({message:"User not authorized to modify this ticket"})
        }
        
    }
}

module.exports = ticketController;