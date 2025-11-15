const User = require('../models/users');
// Create a new user
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Read all users
exports.getUsers = async (req, res) => {
    const users = await User.find({isAdmin: false});
    res.json(users);
};
// read one user
exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
};

//update user
exports.updateUser = async (req, res) => {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, 
        { 
        new: true, 
        runValidators: true
     });
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json(updated);
};
//delete user
exports.deleteUser = async (req, res) => {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
};