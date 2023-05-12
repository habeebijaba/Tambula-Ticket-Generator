const express = require('express')
const router = express.Router()

const verifyToken = require('../middlewares/auth')

const {
    generateTickets,
    getTickets
}
    = require('../controllers/ticketController')


router.post('/generateTicket', verifyToken, generateTickets)

router.get('/getTickets', verifyToken, getTickets)


module.exports = router
