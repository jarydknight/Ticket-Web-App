const { Schema, model } = require("mongoose");

// ticketComment Schema
const TicketBucketSchema = new Schema(
    {
        bucketName: {
            type: String,
            required: true,
        },
        users: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
            select: false
        },
        l1Admins: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
            select: false
        },
        l2Admins: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
            select: false
        },
        userJoinRequests: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
            select: false
        },
        tickets: {
            type: [Schema.Types.ObjectId],
            ref: 'Ticket',
            select: false
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        }
    }
)

const TicketBucket = model('TicketBucket', TicketBucketSchema);

module.exports = TicketBucket;