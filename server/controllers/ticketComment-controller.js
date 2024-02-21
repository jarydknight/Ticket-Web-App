const Ticket = require("../models/ticket");
const TicketComment = require("../models/ticketComment");

// TicketComment controller
const ticketCommentController = {
    // Create new comment
    createNewTicketComment(req, res) {
        const privilege = res.locals.privilege;
        const ownership = res.locals.ownership;
        try {
            if ( ownership || privilege === "l1Admin" || privilege === "l2Admin") {
                // Create new ticket comment
                TicketComment.create({
                    user: res.locals.userId,
                    comment: req.body.comment,
                    ticket: req.body.ticket,
                    ticketBucket: req.body.ticketBucket
                })
                .then(commentDbData => {
                    // Add ObjectId for ticket comment to ticket object
                    Ticket.findById(req.body.ticket)
                    .then(ticketDdbData => {
                        ticketDdbData.ticketComments.push(commentDbData);
                        ticketDdbData.save();
                    })
                })
                
                res.json({message: "Comment created successfully"})
            } else {
                res.status(401).json({message: "User not authorized to create comment for this ticket"})
            }
        } catch {
            res.status(400).json({message: "Error creating new comment"})
        }
    },
    // Delete comment by ID
    deleteTicketCommentByID({params}, res) {
        TicketComment.findOneAndDelete(params.id)
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({message: "Comment not found"})
                return;
            }
            res.json(dbData);
        })
        .catch(err => {
            res.json(err)
        })
    }
}

module.exports = ticketCommentController;