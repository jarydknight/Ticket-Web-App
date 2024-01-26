const TicketBucket = require("../models/ticketBucket");

// ticketBucker Controller object
const ticketBucketController = {
    createNewBucket({body}, res) {
        TicketBucket.create(body)
        .then(dbData => {
            res.json(dbData)
        })
        .catch(err => {
            res.jspn(err)
        })
    },

    getBucketById({params}, res) {
        TicketBucket.findById(params.id)
        .then(dbData => {
            res.json(dbData)
        })
        .catch(err => {
            res.sendStatus(400)
        })
    },

    deleteBucketById({params}, res) {
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