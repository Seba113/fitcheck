const Profile = require('../models/Profile');

exports.upsertProfile = async (req, res) => {
  try {
    const { skills, experienceYears, seniority, rawCvText } = req.body;

    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ message: 'skills debe ser un array de strings' });
    }

    const profile = await Profile.findOneAndUpdate(
      { userId: req.userId },
      { skills, experienceYears, seniority, rawCvText },
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al guardar el perfil' });
  }
};

exports.getProfile = async (req, res) => {
  const profile = await Profile.findOne({ userId: req.userId });
  if (!profile) {
    return res.status(404).json({ message: 'Perfil no encontrado' });
  }
  res.json(profile);
};