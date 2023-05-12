const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(400).json({ message: "Authorization failed" })
    }

    try {
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedToken
        next();
    } catch (err) {
        return res.status(500).json({ message: "Invalid Token" })
    }
}

module.exports = verifyToken