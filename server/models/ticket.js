const {Schema, model, Types} = require("mongoose");

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
        details: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        bucket: {
            type: Schema.Types.ObjectId,
            ref: 'ticketBucket',
            required: true
        }
    }
);

const Ticket = model('Ticket', ticketSchema);

module.exports = Ticket;