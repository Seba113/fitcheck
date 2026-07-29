const mongoose = require('mongoose');

const jobAnalysisSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobTitle: { type: String, required: true },
  jobRawText: { type: String, required: true },
  extractedRequirements: {
    mustHave: [{ type: String }],
    niceToHave: [{ type: String }],
    seniority: { type: String },
    technologies: [{ type: String }],
  },
  matchScore: { type: Number },
  matchingSkills: [{ type: String }],
  gaps: [{ type: String }],
  suggestions: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('JobAnalysis', jobAnalysisSchema);