const User = require('../models/users');

const jwt = require('jsonwebtoken');


function generateToken(user) {
    return jwt.sign({ id: user._id, email: user.email },
        process.env.JWT_SECRET, { expiresIn: '7d' });
}

// Register new user
exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = generateToken(user);
        res.status(201).json({ user, token });
    } catch (error) {
        console.error(error.message)
        res.status(400).json({ error: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const Match = await user.comparePassword(password);
    if (!Match) return res.status(400).json({ error: 'Invalid email or password' });

    const token = generateToken(user);
    res.json({ user, token });
};