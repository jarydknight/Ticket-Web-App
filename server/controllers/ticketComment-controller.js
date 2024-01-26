const TicketComment = require("../models/ticketComment");

// TicketComment controller
const ticketCommentController = {
    // Create new comment
    createNewTicketComment({body}, res) {
        TicketComment.create(body)
        .then(dbData => {
            res.json(dbData)
        })
        .catch(err => {
            res.json(err)
        })
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