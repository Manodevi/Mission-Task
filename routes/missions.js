const express = require('express');
const router = express.Router();

// @route   POST api/missions
// @desc    Add a Mission
// @access  Public
router.post('/', (req, res) => {
  res.send('Add a mission');
});

// @route   GET api/missions
// @desc    Get Missions
// @access  Public
router.get('/', (req, res) => {
  res.send('List Missions');
});

module.exports = router;
