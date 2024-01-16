const router = require("express").Router();

router.route('/')
.get((req, res) => {
    res.send({ticket: "Ticket info"})
})

module.exports = router;