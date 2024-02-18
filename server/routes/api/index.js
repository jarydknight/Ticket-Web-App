const router = require("express").Router();
const userRoutes = require("./userRoutes");
const ticketRoutes = require("./ticketRoutes");
const ticketBucketRoutes = require("./ticketBucketRoutes");
const ticketCommentRoutes = require("./ticketCommentRoutes");
const signupRoutes = require("./signupRoutes");
const loginRoutes = require("./loginRoutes");
const { authenticateUser, checkPrivilege } = require("../../utils/manageUserPermission");

router.use('/users', authenticateUser, checkPrivilege, userRoutes);
router.use('/tickets', authenticateUser, checkPrivilege, ticketRoutes);
router.use('/bucket', authenticateUser, ticketBucketRoutes);
router.use('/comment', authenticateUser, ticketCommentRoutes);
router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);

module.exports = router;