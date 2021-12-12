const express = require('express');
const router = express.Router();

// @route   POST api/missions
// @desc    Add a Mission
// @access  Public
router.post('/', (req, res) => {
  res.send('Add a mission');
});

module.exports = router;
