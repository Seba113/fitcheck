const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  skills: [{ type: String }],
  experienceYears: { type: Number, default: 0 },
  seniority: { type: String, enum: ['junior', 'semi-senior', 'senior'], default: 'junior' },
  rawCvText: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);