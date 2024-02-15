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
// function readToken (cookie) {
//     const id = jwt.verify(cookie, process.env.TOKEN_KEY, (err, decoded) => {
//         if (err) {
//             err = {
//                 name: 'tokenExpiredError',
//                 message: 'JWT expired',
//         }
//             return {err}
//         }
//         return decoded._id;
//     })
//     return id;
    
// }

function authenticateUser (req, res, next) {
    const id = jwt.verify(req.cookies.token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
            err = {
                name: 'tokenExpiredError',
                message: 'JWT expired',
            }
            // return {err}
            res.status(401).send({message: err})
            next(err)
        } else {
            return decoded._id;
        }   
    })
    res.locals.userId = id;
    next()
    
}

const checkAdminPrivilege = async (userId, bucketId) => {
    return new Promise((resolve, reject) => {
        User.findById(userId)
            .then(dbData => {
                let privilege;

                if (dbData.Roles.l1Admin.includes(bucketId)) {
                    privilege = "l1Admin";
                } else if (dbData.Roles.l2Admin.includes(bucketId)) {
                    privilege = "l2Admin";
                } else if (dbData.Roles.user.includes(bucketId.toString())) {
                    privilege = "user";
                } else {
                    privilege = false;
                }
                resolve(privilege);
            })
            .catch(err => {
                console.error(err);
                reject("Error checking admin privilege");
            });
    });
};

module.exports = { addUserPermissions, authenticateUser, checkAdminPrivilege }