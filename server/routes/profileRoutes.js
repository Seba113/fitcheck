const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { upsertProfile, getProfile } = require('../controllers/profileController');

router.post('/', auth, upsertProfile);
router.get('/', auth, getProfile);

module.exports = router;