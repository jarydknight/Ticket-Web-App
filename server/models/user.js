const {Schema, model} = require("mongoose");
const Ticket = require("./ticket");

// User schema
const UserSchema = new Schema(
    {
        userName: {
            type: String,
            required: true
        },
        password: {

        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/]
        },
        location: {
            type: String,
            required: true
        },
        position: {
            type: String
        },
        userTickets: {
            openTickets: [
                {
                type: Schema.Types.ObjectId,
                ref: 'Ticket'
                }
            ],
            closedTicket: [
                {
                type: Schema.Types.ObjectId,
                ref: 'Ticket'
                }
            ]
        },
        adminTickets: {
            openTickets: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Ticket'
                }
            ],
            closedTickets: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Ticket'
                }
            ]
        },
        Roles: {
            user: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'ticketBucket'
                }
            ],
            l1Admin: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'ticketBucket'
                }
            ],
            l2Admin: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'ticketBucket'
                }
            ]
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
);

const User = model('User', UserSchema);

module.exports = User;