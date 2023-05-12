const Ticket = require('../models/ticket.js')
const { generateTicket } = require('../helpers/ticketHelper.js')


const generateTickets = async (req, res) => {
    try {
        const { numberOfTicket } = req.body

        if (!numberOfTicket || isNaN(numberOfTicket) || numberOfTicket <= 0) {
            return res.status(400).json({ message: 'Invalid request body' });
        }

        const tickets = generateTicket(numberOfTicket)

        const newTickets = new Ticket({ tickets })

        const savedTickets = await newTickets.save()
        return res.status(200).json(savedTickets._id)
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
}



const getTickets = async (req, res) => {
    try {
        const { skip, limit } = req.query;
        const tickets = await Ticket.find().skip(skip).limit(limit)
        return res.status(200).json(tickets)
    } catch (err) {
        return res.status(500).json("Internal Server error !")
    }
}


module.exports = {
    generateTickets,
    getTickets
}