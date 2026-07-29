const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {createAnalysis, getAnalyses} = require('../controllers/analysisController');

router.post('/analyses', auth, createAnalysis);
router.get('/analyses', auth, getAnalyses);

module.exports = router;