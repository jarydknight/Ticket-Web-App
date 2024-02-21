const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Ticket = require("../models/ticket");
const Bucket = require("../models/ticketBucket")

// Apply user permissions to user
function addUserPermissions (userId, role, ticketBucketId) {
    try {
        User.findById(userId)
        .then((dbData) => {
            dbData.Roles[`${role}`].push(ticketBucketId);
            dbData.save();
        })
    } catch {
        res.json({message: "Error adding adding permissions to user"})
    }

    try {
        Bucket.findById(ticketBucketId)
        .select(`${role}`)
        .then( dbData => {
            dbData[`${role}`].push(userId);
            dbData.save();
        })
    } catch {
        res.json({message: "Error adding permissions to ticket bucket"})
    }
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

// Check user privilege for ticket bucket they are trying to access
const checkPrivilege = async (req, res, next) => {
    return new Promise((resolve, reject) => {
        const userId = res.locals.userId;
        const bucketId = req.body.ticketBucket
        
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
            reject("Error checking privilege");
        });
        
        
    });
};

// Checks for ownership of ticket and attaches ticket to res.locals so that ticket does not need to be looked up again when passed from this middleware
const checkOwnership = async (req, res, next) => {
    // console.log(req.params)
    return new Promise((resolve, reject) => {
        const ticketId = req.params.id || req.body.ticket;
        const userId = res.locals.userId

        Ticket.findById(ticketId)
        .populate(["user", "ticketComments", "assignee"])
        .then(dbData => {
            let ownership

            if (userId === dbData.user._id.toString()) {
                ownership = true;
            } else {
                ownership = false;
            }
            res.locals.ticket = dbData;
            res.locals.ownership = ownership;
            resolve(ownership);
            next()
        })
        .catch(err => {
            // Keeping reject part of promise causes error to not be handled properly by catch statement
            // reject("Ticket not found");
            console.error(err)
            res.status(404).json({message:"Ticket not found"})
        })
    })
}

module.exports = { addUserPermissions, authenticateUser, checkPrivilege, checkOwnership }