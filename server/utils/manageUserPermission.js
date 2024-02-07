const jwt = require("jsonwebtoken");
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
// TODO
function readToken (cookie) {
    const id = jwt.verify(cookie, process.env.TOKEN_KEY, (err, decoded) => {
        return decoded._id;
    })
    return id;
    
}

module.exports = { addUserPermissions, readToken }