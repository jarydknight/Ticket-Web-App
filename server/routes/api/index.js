const router = require("express").Router();
const userRoutes = require("./userRoutes");
const ticketRoutes = require("./ticketRoutes");
const ticketBucketRoutes = require("./ticketBucketRoutes");
const ticketCommentRoutes = require("./ticketCommentRoutes");
const signupRoutes = require("./signupRoutes");
const loginRoutes = require("./loginRoutes");

router.use('/users', userRoutes);
router.use('/tickets', ticketRoutes);
router.use('/bucket', ticketBucketRoutes);
router.use('/comment', ticketCommentRoutes);
router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);

module.exports = router;