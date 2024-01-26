const router = require("express").Router();
const { createNewTicketBucket, getTicketBucketById, deleteTicketBucketById } = require("../../controllers/ticketBucket-controller");

router.route("/")
.post(createNewTicketBucket)

router.route("/:id")
.get(getTicketBucketById)
.delete(deleteTicketBucketById)

module.exports = router;