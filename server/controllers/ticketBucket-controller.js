const TicketBucket = require("../models/ticketBucket");
const { addUserPermissions, acceptUserPermissionRequest, rejectUserPermissionRequest, removeUserPermissions } = require("../utils/manageUserPermission");
const Mongoose = require("mongoose")


// ticketBucker Controller object
const ticketBucketController = {
    // Create new Ticket Bucket
    createNewTicketBucket({body}, res) {
        TicketBucket.create(body)
        .then((dbData) => {
            // Give user that created the bucket l1Admin permissions for the bucket
           if ( addUserPermissions(res.locals.userId, "l1Admin", dbData._id)) {
                res.json({"message": "Ticket Bucket successfully created"})
           } else {
                res.json({message: "Error adding adding permissions to user"})
           }
            
        })
    },

    // Find ticket Bucket by ID
    getTicketBucketById({params}, res) {
        const privilege = res.locals.privilege;

        // Return ticket bucket with all information for admin
        if (privilege === "l1Admin" || privilege === "l2Admin") {
            TicketBucket.findById(params.id)
            .select(["users", "l1Admin", "l2Admin", "userJoinRequests"])
            .populate(["users", "l1Admin", "l2Admin", "userJoinRequests", "tickets"])
            .then(dbData => {
                res.json(dbData)
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(400)
            })
        } 
        // Return ticket bucket with only name and ID for non admin users
        else {
            TicketBucket.findById(params.id)
            .then(dbData => {
                res.json(dbData)
            })
            .catch(err => {
                console.error(err)
                res.sendStatus(400)
            })
        }
    },

    // Delete Ticket Bucket by ID
    deleteTicketBucketById({params}, res) {
        const privilege = res.locals.privilege;

        if (privilege === "l1Admin") {
            TicketBucket.findOneAndDelete(params.id)
            .then(dbData => {
                if (!dbData) {
                    res.status(404).json({message: "Bucket not found"})
                    return;
                }
                res.json(dbData)
            })
            .catch(err => {
                res.json(err)
            })
        } else {
            res.json({message: "User not authorized to delete ticket bucket"})
        }
    },

    // User request to join bucket as a user
    userPermissionRequest(req, res) {
        const ticketBucketId = req.params.id;
        const userId = res.locals.userId;
        try {
            TicketBucket.findById(ticketBucketId)
            .select("userJoinRequests")
            .then(dbData => {
                dbData.userJoinRequests.push(new Mongoose.Types.ObjectId(userId));
                dbData.save()
                res.json({message: "User permission request was successful"})
            })
        } catch {
            res.status(400).json({message: "Error requesting user privilege for this bucket"})
        }
    },

    // Admin get user membership request
    getUserPermissionRequests (req, res) {
        const ticketBucketId = req.params.id;
        const privilege = res.locals.privilege;

        if (privilege === "l1Admin" || privilege === "l2Admin") {
            try {
                TicketBucket.findById(ticketBucketId)
                .select("userJoinRequests")
                .populate("userJoinRequests")
                .then(dbData => {
                    res.json({
                        message: "Request successful",
                        data: dbData
                    })
                })
            } catch {
                res.status(400).json({message: "Error retrieving user permission requests"})
            }
        } else {
            res.status(401).json({message: "User not authorized to access user permission requests"})
        }
    },

    // Controller for admin to modify bucket privilege. Accept or reject user join requests and remove users from bucket
    modifyBucketPermissions(req, res) {
        const privilege = res.locals.privilege;
        const action = req.body.action
        const userId = req.body.user
        const ticketBucketId = req.body.ticketBucket

        if (privilege === "l1Admin") {
            if (action === "accept") {
                if (acceptUserPermissionRequest(userId, ticketBucketId)) {
                    res.json({message: "User permission request successfully accepted"})
                } else {
                    res.status(400).json({message: "Error accepting user permission request"})
                }
            } else if (action === "reject") {
                if (rejectUserPermissionRequest(userId, ticketBucketId)) {
                    res.json({message: "User permission request successfully rejected"})
                } else {
                    res.status(400).json({message: "Error rejecting user permission request"})
                }
            } else if (action === "addL1Admin") {
                if (addUserPermissions(userId, "l1Admin", ticketBucketId)) {
                    res.json({message: "User successfully added as l1Admin"})
                } else {
                    res.status(400).json({message: "Error adding user as l1Admin"})
                }
            } else if (action === "addL2Admin") {
                if (addUserPermissions(userId, "l2Admin", ticketBucketId)) {
                    res.json({message: "User successfully added as l2Admin"})
                } else {
                    res.status(400).json({message: "Error adding user as l2Admin"})
                }
            } else if (action === "removeUser") {
                const role = req.body.role;
                if (removeUserPermissions(userId, role, ticketBucketId)) {
                    res.json({message: "User permission successfully removed for this bucket"})
                } else {
                    res.status(400).json({message: "Error removing user privileges from this bucket"})
                }
            } else {
                res.status(400).json({message: "Error modifying ticket bucket permissions. Please check action selected."})
            }
        } else if (privilege === "l2Admin") {
            if (action === "accept") {
                if (acceptUserPermissionRequest(userId, ticketBucketId)) {
                    res.json({message: "User permission request successfully accepted"})
                } else {
                    res.status(400).json({message: "Error accepting user permission request"})
                }
            } else if (action === "reject") {
                if (rejectUserPermissionRequest(userId, ticketBucketId)) {
                    res.json({message: "User permission request successfully rejected"})
                } else {
                    res.status(400).json({message: "Error rejecting user permission request"})
                }
            } else if (action === "removeUser") {
                const role = req.body.role;
                
                if (role === "user") {
                    if (removeUserPermissions(userId, role, ticketBucketId)) {
                        res.json({message: "User permission successfully removed for this bucket"})
                    } else {
                        res.status(400).json({message: "Error removing user privileges from this bucket"})
                    }
                } else {
                    res.status(400).json({message: "Error modifying ticket bucket permissions. Please check action selected and make sure user has permission to complete the action"})
                }
            } else {
                res.status(400).json({message: "Error modifying ticket bucket permissions. Please check action selected and make sure user has permission to complete the action"})
            }
        } else {
            res.json({message: "User does not have permission to modify ticket bucket permissions"})
        }
    }
}

module.exports = ticketBucketController;