const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    clinicName: { type: String, required: true },
    doctorName: { type: String, required: true },
    clinicNumber: { type: String, required: true },
    location: { type: String, required: true },
    establishedDate: { type: Date, required: true },
    panchkarma: { type: String },
    imageUrls: [String],  // Array of image URLs uploaded by the user
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
