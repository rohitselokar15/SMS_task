const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const path = require('path');

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Image upload route
router.post('/upload/:userId', upload.array('images', 2), async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).send('User not found');

        const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
        user.imageUrls.push(...imageUrls);
        await user.save();

        res.status(200).json({ message: 'Images uploaded successfully', imageUrls });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
