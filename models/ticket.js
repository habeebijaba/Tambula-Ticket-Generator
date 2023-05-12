const mongoose = require('mongoose')
const { generateNestedArraySchema } = require('../utils/nestedArrayGenerator')

const ticketSchema = new mongoose.Schema({
    tickets: generateNestedArraySchema(3)
});

const Ticket = mongoose.model("Ticket", ticketSchema)
module.exports = Ticket