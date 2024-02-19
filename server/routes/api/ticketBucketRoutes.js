const router = require("express").Router();
const { createNewTicketBucket, getTicketBucketById, deleteTicketBucketById } = require("../../controllers/ticketBucket-controller");

router.route("/")
.post(createNewTicketBucket)

router.route("/:id")
.get(getTicketBucketById)
.delete(deleteTicketBucketById)

// TODO: COMPLETE FUNCTIONS FOR THE PERMISSIONS ROUTE FOR BUCKETS FOR ADMIN
// router.route("/:id/permissions/admin")
// .get(getUserPermissionRequests)
// .put(acceptOrRejectPermissionRequest)
// .delete(removeUserFromBucket)

// TODO: COMPLETE FUNCTIONS FOR THE PERMISSION ROUTE FOR BUCKETS FOR USERS

// router.route("/:id/permissions/user")
// .put(requestToJoinBucket)
// .delete(leaveBucket)

module.exports = router;