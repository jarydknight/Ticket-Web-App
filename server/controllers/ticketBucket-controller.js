const TicketBucket = require("../models/ticketBucket");
const addUserPermissions = require("../utils/manageUserPermission");

// ticketBucker Controller object
const ticketBucketController = {
    // Create new Ticket Bucket
    createNewTicketBucket({body}, res) {
        TicketBucket.create(body)
        .then((dbData) => {
            addUserPermissions(body.userId, "l1Admin", dbData._id)
            res.json({"message": "Ticket Bucket successfully created"})
        })
    },

    // Find ticket Bucket by ID
    getTicketBucketById({params}, res) {
        TicketBucket.findById(params.id)
        .then(dbData => {
            res.json(dbData)
        })
        .catch(err => {
            res.sendStatus(400)
        })
    },

    // Delete Ticket Bucket by ID
    deleteTicketBucketById({params}, res) {
        TicketBucket.findOneAndDelete(params.id)
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({message: "Bucketnot found"})
                return;
            }
            res.json(dbData)
        })
        .catch(err => {
            res.json(err)
        })
    }
}

module.exports = ticketBucketController;