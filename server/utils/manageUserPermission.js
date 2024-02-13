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
// Read token from Cookie to get user ID
function readToken (cookie) {
    const id = jwt.verify(cookie, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
            err = {
                name: 'tokenExpiredError',
                message: 'JWT expired',
        }
            return {err}
        }
        return decoded._id;
    })
    return id;
    
}

module.exports = { addUserPermissions, readToken }