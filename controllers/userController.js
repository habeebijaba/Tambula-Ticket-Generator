const User = require('../models/user.js')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');


const signUp = async (req, res) => {
    try {
        let { email, password } = req.body

        const userExist = await User.findOne({ email: email })

        if (userExist) {
            return res.status(400).json("User already exists!")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ email, password: hashedPassword })
        await newUser.save()

        res.status(200).json("User Created")
    } catch (err) {
        res.status(500).json("Internal Server error!")
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json("No user exists with entered email.");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json("Password is incorrect.");
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }

};


module.exports = {
    signUp,
    login
}