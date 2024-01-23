const {Schema, model, Types} = require("mongoose");

// Ticket Schema

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
        }
    }
);

const Ticket = model('Ticket', ticketSchema);

module.exports = Ticket;