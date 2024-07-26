const router = require('express').Router();
const User = require('../models/user'); // Ensure correct case
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        console.log(newUser)

        const user = await newUser.save();
        console.log(user)
        res.status(201).json({
            message: 'User registered successfully',
            user: user
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error registering user',
            error: err.message
        });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json("User not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        console.log(validPassword)
        if (!validPassword){
            console.log('Wrong password');
            return res.status(400).json({ message: 'Wrong password' });
        } 
            

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.header('auth-token', token).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
});

// Get User Data
router.get('/user', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user data', error: err.message });
    }
});

// Update User Data
router.put('/user', verifyToken, async (req, res) => {
    try {
        console.log(req.body)
        const updatedUser = await User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Error updating user data', error: err.message });
    }
});
// deleted
router.delete('/delete', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from token
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;