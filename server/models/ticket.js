const { Schema, model } = require("mongoose");

// Ticket Schema
// TODO: GET USER TO POPULATE WHEN TICKET GET REQUEST MADE
const ticketSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        assignee: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        ticketDetails: {
            type: String,
            required: true,
            immutable: true
        },
        ticketComments: {
            type: [Schema.Types.ObjectId],
            ref: 'TicketComment',
            immutable: true
        },
        status: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        bucket: {
            type: Schema.Types.ObjectId,
            ref: 'TicketBucket',
            required: true,
            immutable: true
        }
    }
);

const Ticket = model('Ticket', ticketSchema);

module.exports = Ticket;