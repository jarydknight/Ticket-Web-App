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

// Middleware to read JWT token to authenticate user and protect routes that require auth
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

const checkPrivilege = async (req, res, next) => {
    return new Promise((resolve, reject) => {
        const userId = res.locals.userId;
        const bucketId = req.body.ticketBucket
        console.log(userId, bucketId)
        User.findById(userId)
        .then(dbData => {
            let privilege;

            if (dbData.Roles.l1Admin.includes(bucketId)) {
                privilege = "l1Admin";
            } else if (dbData.Roles.l2Admin.includes(bucketId)) {
                privilege = "l2Admin";
            } else if (dbData.Roles.user.includes(bucketId)) {
                privilege = "user";
            } else {
                privilege = false;
            }
            res.locals.privilege = privilege
            resolve(privilege);
            next()
        })
        .catch(err => {
            console.error(err);
            reject("Error checking admin privilege");
        });
        
        
    });
};

module.exports = { addUserPermissions, authenticateUser, checkPrivilege }