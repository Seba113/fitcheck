const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {createAnalysis, getAnalyses} = require('../controllers/analysisController');

router.post('/', auth, createAnalysis);
router.get('/', auth, getAnalyses);

module.exports = router;