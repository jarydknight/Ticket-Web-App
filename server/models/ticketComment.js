const { Schema, model } = require("mongoose");

// TicketComment Schema
const TicketCommentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        ticket: {
            type: Schema.Types.ObjectId,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

const TicketComment = model('TicketComment', TicketCommentSchema);

module.exports = TicketComment;