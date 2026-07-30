const JobAnalysis = require('../models/JobAnalysis');
const Profile = require('../models/Profile');
const { extractJobRequirements } = require('../services/aiService');
const { calculateMatch } = require('../services/scoringService');

exports.createAnalysis = async (req, res) => {
    try{
        const {jobTitle, jobRawText} = req.body;
        if(!jobTitle || !jobRawText){
            return res.status(400).json({error: 'Faltan datos requeridos: jobTitle y jobRawText'});
        }

        const profile = await Profile.findOne({userId: req.userId});   // ← corregido
        if(!profile){
            return res.status(404).json({error: 'Primero completa tu perfil'});
        }

        const requirements = await extractJobRequirements(jobRawText);
        const {matchScore, matchingSkills, gaps} = calculateMatch(profile.skills, requirements);

        const analysis = await JobAnalysis.create({
            userId: req.userId,   // ← corregido
            jobTitle,
            jobRawText,
            extractedRequirements: requirements,
            matchScore,
            matchingSkills,
            gaps,
            suggestions: [],
        });

        res.status(201).json(analysis);
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Error al crear el análisis de la vacante'});
    }
}

exports.getAnalyses = async (req, res) => {
    try {
        const analyses = await JobAnalysis.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json(analyses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener los análisis' });
    }
}