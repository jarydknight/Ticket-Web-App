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
        l1Admin: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
            select: false
        },
        l2Admin: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
            select: false
        },
        userJoinRequest: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
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