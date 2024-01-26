const { Schema, model } = require("mongoose");

// ticketComment Schema
const TicketBucketSchema = new Schema(
    {
        queueName: {
            type: String,
            required: true,
        },
        users: {
            type: [Schema.Types.ObjectId],
            ref: 'User'
        },
        l1Admin: {
            type: [Schema.Types.ObjectId],
            ref: 'User'
        },
        l2Admin: {
            type: [Schema.Types.ObjectId],
            ref: 'User'
        },
        userJoinRequest: {
            type: [Schema.Types.ObjectId],
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }
)

const TicketBucket = model('TicketBucket', TicketBucketSchema);

module.exports = TicketBucket;