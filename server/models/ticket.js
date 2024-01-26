const { Schema, model } = require("mongoose");

// Ticket Schema
// TODO: GET USER TO POPULATE WHEN TICKET GET REQUEST MADE
const ticketSchema = new Schema(
    {
        ticketNumber: {
        type: String,
        required: true
        },
        user:
            {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
            },
        ticketDetails: {
            type: String,
            required: true,
        },
        ticketComments: {
            type: [Schema.Types.ObjectId],
            ref: 'TicketComments'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        bucket: {
            type: Schema.Types.ObjectId,
            ref: 'TicketBucket',
            required: true
        }
    }
);

const Ticket = model('Ticket', ticketSchema);

module.exports = Ticket;