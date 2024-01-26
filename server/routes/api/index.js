const router = require("express").Router();
const userRoutes = require("./userRoutes");
const ticketRoutes = require("./ticketRoutes");
const ticketBucketRoutes = require("./ticketBucketRoutes");
const ticketCommentRoutes = require("./ticketCommentRoutes");

router.use('/users', userRoutes);
router.use('/tickets', ticketRoutes);
router.use('/comment', ticketCommentRoutes);
router.use('/comment', ticketCommentRoutes);

module.exports = router;