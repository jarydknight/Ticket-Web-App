const { Schema, model } = require("mongoose");

// TicketComment Schema
const TicketCommentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            immutable: true
        },
        comment: {
            type: String,
            required: true,
            immutable: true
        },
        ticket: {
            type: Schema.Types.ObjectId,
            required: true,
            immutable: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        ticketBucket: {
            type: Schema.Types.ObjectId,
            ref: 'ticketBucket',
            required: true,
            immutable: true
        }
    }
)

const TicketComment = model('TicketComment', TicketCommentSchema);

module.exports = TicketComment;