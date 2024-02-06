const ticketBucket = require("../models/ticketBucket");
const User = require("../models/user");

// Apply user permissions to user
function addUserPermissions (userId, role, ticketBucketId) {
    User.findById(userId)
    .then((dbData) => {
        dbData.Roles[`${role}`].push(ticketBucketId)
        dbData.save()
    })

};

module.exports = addUserPermissions 