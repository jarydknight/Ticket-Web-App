const router = require("express").Router();
const { createNewTicketBucket, getTicketBucketById, deleteTicketBucketById, userMembershipRequest } = require("../../controllers/ticketBucket-controller");

router.route("/")
.post(createNewTicketBucket)

router.route("/:id")
.get(getTicketBucketById)
.delete(deleteTicketBucketById)

// TODO: COMPLETE FUNCTIONS FOR THE PERMISSIONS ROUTE FOR BUCKETS FOR ADMIN
// router.route("/:id/permissions/admin")
// .get(getUserPermissionRequests)
// .put(adminModifyBucketPermissions)

// TODO: COMPLETE FUNCTIONS FOR THE PERMISSION ROUTE FOR BUCKETS FOR USERS

router.route("/:id/permissions/user")
.put(userMembershipRequest)


module.exports = router;