const express = require('express');
const app = express()
const logger = require('morgan')
const dotenv = require('dotenv')
dotenv.config();

const { connectdb } = require('./config/database')
const userRoutes = require('./routes/userRoutes')
const ticketRoutes = require('./routes/ticketRoutes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

//Routes
app.use('/', userRoutes)
app.use('/ticket', ticketRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    connectdb();
    console.log("server started");
})